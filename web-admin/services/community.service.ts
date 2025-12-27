import apiService from './api';

export interface ForumTopic {
    id: number;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    category: string;
    views: number;
    status: string;
    _count?: { replies: number };
    createdAt: string;
}

export interface QAQuestion {
    id: number;
    question: string;
    content?: string;
    askedById: string;
    askedByName: string;
    category: string;
    views: number;
    status: string;
    _count?: { answers: number };
    createdAt: string;
}

export interface SupportGroup {
    id: number;
    name: string;
    description?: string;
    membersCount: number;
    postsCount: number;
    moderatorId: string;
    moderatorName: string;
    status: string;
    createdAt: string;
}

export interface ModerationReport {
    id: number;
    contentId: string;
    contentType: string;
    contentPreview?: string;
    authorId: string;
    authorName: string;
    reportedById: string;
    reportedByName: string;
    reason: string;
    status: string;
    createdAt: string;
}

class CommunityService {
    private readonly baseUrl = '/community';

    // Forum
    async getForumTopics(): Promise<ForumTopic[]> {
        return apiService.get<ForumTopic[]>(`${this.baseUrl}/forum/topics`);
    }

    async getForumTopic(id: number): Promise<ForumTopic> {
        return apiService.get<ForumTopic>(`${this.baseUrl}/forum/topics/${id}`);
    }

    async createForumTopic(data: Partial<ForumTopic>): Promise<ForumTopic> {
        return apiService.post<ForumTopic>(`${this.baseUrl}/forum/topics`, data);
    }

    async updateForumTopic(id: number, data: Partial<ForumTopic>): Promise<ForumTopic> {
        return apiService.put<ForumTopic>(`${this.baseUrl}/forum/topics/${id}`, data);
    }

    async deleteForumTopic(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/forum/topics/${id}`);
    }

    // QA
    async getQAQuestions(): Promise<QAQuestion[]> {
        return apiService.get<QAQuestion[]>(`${this.baseUrl}/qa/questions`);
    }

    async getQAQuestion(id: number): Promise<QAQuestion> {
        return apiService.get<QAQuestion>(`${this.baseUrl}/qa/questions/${id}`);
    }

    async createQAQuestion(data: Partial<QAQuestion>): Promise<QAQuestion> {
        return apiService.post<QAQuestion>(`${this.baseUrl}/qa/questions`, data);
    }

    async updateQAQuestion(id: number, data: Partial<QAQuestion>): Promise<QAQuestion> {
        return apiService.put<QAQuestion>(`${this.baseUrl}/qa/questions/${id}`, data);
    }

    async deleteQAQuestion(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/qa/questions/${id}`);
    }

    // Support Groups
    async getSupportGroups(): Promise<SupportGroup[]> {
        return apiService.get<SupportGroup[]>(`${this.baseUrl}/groups`);
    }

    async getSupportGroup(id: number): Promise<SupportGroup> {
        return apiService.get<SupportGroup>(`${this.baseUrl}/groups/${id}`);
    }

    async createSupportGroup(data: Partial<SupportGroup>): Promise<SupportGroup> {
        return apiService.post<SupportGroup>(`${this.baseUrl}/groups`, data);
    }

    async updateSupportGroup(id: number, data: Partial<SupportGroup>): Promise<SupportGroup> {
        return apiService.put<SupportGroup>(`${this.baseUrl}/groups/${id}`, data);
    }

    async deleteSupportGroup(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/groups/${id}`);
    }

    // Moderation
    async getModerationReports(): Promise<ModerationReport[]> {
        return apiService.get<ModerationReport[]>(`${this.baseUrl}/moderation/reports`);
    }

    async updateModerationReport(id: number, data: Partial<ModerationReport>): Promise<ModerationReport> {
        return apiService.put<ModerationReport>(`${this.baseUrl}/moderation/reports/${id}`, data);
    }

    async deleteModerationReport(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/moderation/reports/${id}`);
    }
}

export default new CommunityService();
