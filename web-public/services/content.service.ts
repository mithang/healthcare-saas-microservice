import { v4 as uuidv4 } from 'uuid';

export interface Category {
    id: string;
    name: string;
}

export interface Post {
    id: string;
    title: string;
    categoryId: string;
    category?: string; // Derived for display
    content: string;
    isActive: boolean;
    thumbnail: string;
    desc: string;
    author: string;
    date: string;
    view: number;
    type: string;
}

export interface TopSearchKeyword {
    id: string;
    keyword: string;
    searchTimes: number;
    isActive: boolean;
}

class ContentService {
    private readonly STORAGE_KEY_POSTS = 'mock_posts';
    private readonly STORAGE_KEY_CATEGORIES = 'mock_categories';
    private readonly STORAGE_KEY_TOP_SEARCH = 'mock_top_searches';

    private getPostsFromStorage(): Post[] {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(this.STORAGE_KEY_POSTS);
        return stored ? JSON.parse(stored) : [];
    }

    private savePostsToStorage(posts: Post[]) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.STORAGE_KEY_POSTS, JSON.stringify(posts));
    }

    private getCategoriesFromStorage(): Category[] {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(this.STORAGE_KEY_CATEGORIES);
        if (stored) return JSON.parse(stored);

        // Default categories if empty
        const defaults = [
            { id: '1', name: 'Sống khỏe' },
            { id: '2', name: 'Y học' },
            { id: '3', name: 'Tin tức' }
        ];
        this.saveCategoriesToStorage(defaults);
        return defaults;
    }

    private saveCategoriesToStorage(categories: Category[]) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    }

    private getTopSearchesFromStorage(): TopSearchKeyword[] {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(this.STORAGE_KEY_TOP_SEARCH);
        return stored ? JSON.parse(stored) : [];
    }

    private saveTopSearchesToStorage(data: TopSearchKeyword[]) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.STORAGE_KEY_TOP_SEARCH, JSON.stringify(data));
    }

    // --- Posts ---

    async getPosts(): Promise<Post[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const posts = this.getPostsFromStorage();
        const categories = this.getCategoriesFromStorage();

        return posts.map(p => ({
            ...p,
            category: categories.find(c => c.id === p.categoryId)?.name || 'Unknown'
        }));
    }

    async getPost(id: string): Promise<Post> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const posts = this.getPostsFromStorage();
        const post = posts.find(p => p.id === id);
        if (!post) throw new Error('Post not found');
        return post;
    }

    async createPost(data: Omit<Post, 'id' | 'view' | 'date'>): Promise<Post> {
        await new Promise(resolve => setTimeout(resolve, 800));
        const posts = this.getPostsFromStorage();
        const newPost: Post = {
            ...data,
            id: uuidv4(),
            view: 0,
            date: new Date().toLocaleDateString('vi-VN'),
        };
        posts.unshift(newPost);
        this.savePostsToStorage(posts);
        return newPost;
    }

    async updatePost(id: string, data: Partial<Post>): Promise<Post> {
        await new Promise(resolve => setTimeout(resolve, 800));
        const posts = this.getPostsFromStorage();
        const index = posts.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Post not found');

        const updatedPost = { ...posts[index], ...data };
        posts[index] = updatedPost;
        this.savePostsToStorage(posts);
        return updatedPost;
    }

    async deletePost(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        let posts = this.getPostsFromStorage();
        posts = posts.filter(p => p.id !== id);
        this.savePostsToStorage(posts);
    }

    // --- Categories ---

    async getCategories(): Promise<Category[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.getCategoriesFromStorage();
    }

    async createCategory(name: string): Promise<Category> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const categories = this.getCategoriesFromStorage();
        const newCategory = { id: uuidv4(), name };
        categories.push(newCategory);
        this.saveCategoriesToStorage(categories);
        return newCategory;
    }

    async deleteCategory(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        let categories = this.getCategoriesFromStorage();
        categories = categories.filter(c => c.id !== id);
        this.saveCategoriesToStorage(categories);
    }

    // --- Top Searches ---

    async getTopSearches(): Promise<TopSearchKeyword[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.getTopSearchesFromStorage();
    }

    async createTopSearch(keyword: string, searchTimes: number): Promise<TopSearchKeyword> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const items = this.getTopSearchesFromStorage();
        const newItem = { id: uuidv4(), keyword, searchTimes, isActive: true };
        items.push(newItem);
        this.saveTopSearchesToStorage(items);
        return newItem;
    }

    async updateTopSearch(id: string, data: Partial<TopSearchKeyword>): Promise<TopSearchKeyword> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const items = this.getTopSearchesFromStorage();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) throw new Error('Keyword not found');

        const updated = { ...items[index], ...data };
        items[index] = updated;
        this.saveTopSearchesToStorage(items);
        return updated;
    }

    async deleteTopSearch(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        let items = this.getTopSearchesFromStorage();
        items = items.filter(i => i.id !== id);
        this.saveTopSearchesToStorage(items);
    }
}

export const contentService = new ContentService();
export default contentService;
