import apiService from './api';

export interface Category {
    id: number;
    name: string;
}

export interface Post {
    id: number;
    title: string;
    categoryId: number;
    category?: string;
    content: string;
    desc: string;
    isActive: boolean;
    thumbnail: string;
    author: string;
    date: string;
    view: number;
}

export interface Comment {
    id: number;
    targetId: string;
    targetType: 'post' | 'question' | 'video';
    authorName: string;
    content: string;
    date: string;
    isActive: boolean;
}

export interface Question {
    id: number;
    title: string;
    content: string;
    authorName: string;
    category: string;
    date: string;
    isActive: boolean;
    isResolved: boolean;
    answers: Answer[];
}

export interface Answer {
    id: number;
    questionId: number;
    authorName: string;
    content: string;
    date: string;
}

export interface Topic {
    id: number;
    title: string;
    authorName: string;
    date: string;
    category: string;
    viewCount: number;
    commentCount: number;
    isActive: boolean;
}

export interface Banner {
    id: number;
    title: string;
    image: string;
    link: string;
    position: 'home_hero' | 'sidebar' | 'news_top';
    isActive: boolean;
}

export interface Video {
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    duration: string;
    author: string;
    date: string;
    isActive: boolean;
}

export interface StaticPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    isActive: boolean;
}

export interface TopSearchKeyword {
    id: number;
    keyword: string;
    count: number;
    isActive: boolean;
}

class ContentService {
    // --- Posts ---

    async getPosts(): Promise<Post[]> {
        const response = await apiService.get('/content/posts');
        return (response as any).data;
    }

    async getPost(id: string | number): Promise<Post> {
        const response = await apiService.get(`/content/posts/${id}`);
        return (response as any).data;
    }

    async createPost(data: any): Promise<Post> {
        const response = await apiService.post('/content/posts', data);
        return (response as any).data;
    }

    async updatePost(id: string | number, data: any): Promise<Post> {
        const response = await apiService.put(`/content/posts/${id}`, data);
        return (response as any).data;
    }

    async deletePost(id: string | number): Promise<void> {
        await apiService.delete(`/content/posts/${id}`);
    }

    // --- Categories ---

    async getCategories(): Promise<Category[]> {
        const response = await apiService.get('/content/categories');
        return (response as any).data;
    }

    async createCategory(name: string): Promise<Category> {
        const response = await apiService.post('/content/categories', { name });
        return (response as any).data;
    }

    async deleteCategory(id: string | number): Promise<void> {
        await apiService.delete(`/content/categories/${id}`);
    }

    // --- Top Searches ---

    async getTopSearches(): Promise<TopSearchKeyword[]> {
        const response = await apiService.get('/content/top-searches');
        return (response as any).data;
    }

    async createTopSearch(keyword: string, count: number): Promise<TopSearchKeyword> {
        const response = await apiService.post('/content/top-searches', { keyword, count });
        return (response as any).data;
    }

    async updateTopSearch(id: string | number, data: any): Promise<TopSearchKeyword> {
        const response = await apiService.put(`/content/top-searches/${id}`, data);
        return (response as any).data;
    }

    async deleteTopSearch(id: string | number): Promise<void> {
        await apiService.delete(`/content/top-searches/${id}`);
    }

    // --- Banners ---

    async getBanners(): Promise<Banner[]> {
        const response = await apiService.get('/content/banners');
        return (response as any).data;
    }

    async createBanner(data: any): Promise<Banner> {
        const response = await apiService.post('/content/banners', data);
        return (response as any).data;
    }

    async deleteBanner(id: string | number): Promise<void> {
        await apiService.delete(`/content/banners/${id}`);
    }

    // --- Videos ---

    async getVideos(): Promise<Video[]> {
        const response = await apiService.get('/content/videos');
        return (response as any).data;
    }

    async createVideo(data: any): Promise<Video> {
        const response = await apiService.post('/content/videos', data);
        return (response as any).data;
    }

    async deleteVideo(id: string | number): Promise<void> {
        await apiService.delete(`/content/videos/${id}`);
    }

    // --- Static Pages ---

    async getStaticPages(): Promise<StaticPage[]> {
        const response = await apiService.get('/content/pages');
        return (response as any).data;
    }

    async createStaticPage(data: any): Promise<StaticPage> {
        const response = await apiService.post('/content/pages', data);
        return (response as any).data;
    }

    async updateStaticPage(id: string | number, data: any): Promise<StaticPage> {
        const response = await apiService.put(`/content/pages/${id}`, data);
        return (response as any).data;
    }

    async deleteStaticPage(id: string | number): Promise<void> {
        await apiService.delete(`/content/pages/${id}`);
    }

    // --- Questions & Answers ---

    async getQuestions(): Promise<Question[]> {
        const response = await apiService.get('/content/questions');
        return (response as any).data;
    }

    async deleteQuestion(id: string | number): Promise<void> {
        await apiService.delete(`/content/questions/${id}`);
    }

    async addAnswer(questionId: string | number, authorName: string, content: string): Promise<Answer> {
        const response = await apiService.post(`/content/questions/${questionId}/answers`, { authorName, content });
        return (response as any).data;
    }

    // --- Topics ---

    async getTopics(): Promise<Topic[]> {
        const response = await apiService.get('/content/topics');
        return (response as any).data;
    }

    async deleteTopic(id: string | number): Promise<void> {
        await apiService.delete(`/content/topics/${id}`);
    }

    // --- Comments ---

    async getComments(targetId: string, targetType: 'post' | 'question' | 'video'): Promise<Comment[]> {
        const response = await apiService.get('/content/comments', { params: { targetId, targetType } });
        return (response as any).data;
    }

    async getAllComments(): Promise<Comment[]> {
        const response = await apiService.get('/content/comments');
        return (response as any).data;
    }

    async createComment(data: any): Promise<Comment> {
        const response = await apiService.post('/content/comments', data);
        return (response as any).data;
    }

    async deleteComment(id: string | number): Promise<void> {
        await apiService.delete(`/content/comments/${id}`);
    }
}

export const contentService = new ContentService();
export default contentService;
