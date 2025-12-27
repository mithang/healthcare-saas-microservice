import { apiService } from './api';

export interface Lecturer {
    id: string;
    name: string;
    title?: string;
    specialty?: string;
    avatar?: string;
    bio?: string;
}

export interface Lesson {
    id: string;
    courseId: string;
    title: string;
    content?: string;
    videoUrl?: string;
    order: number;
}

export interface Question {
    id: string;
    quizId: string;
    content: string;
    options: string | string[];
    correctOption: number;
}

export interface Quiz {
    id: string;
    courseId: string;
    title: string;
    questions?: Question[];
}

export interface Course {
    id: string;
    code: string;
    name: string;
    type: string;
    provider: string;
    credits: number;
    price: number;
    status: string;
    description?: string;
    thumbnail?: string;
    lecturerId: string;
    lecturer?: Lecturer;
    students?: number;
    lessons?: Lesson[];
    quizzes?: Quiz[];
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    course?: Course;
    status: string;
    progress: number;
    enrolledAt: string;
    completedAt?: string;
}

class EducationService {
    // --- Courses ---
    async getCourses(): Promise<Course[]> {
        const response = await apiService.get('/education/courses');
        return (response as any).data;
    }

    async getCourse(id: string): Promise<Course> {
        const response = await apiService.get(`/education/courses/${id}`);
        return (response as any).data;
    }

    async createCourse(data: Partial<Course>): Promise<Course> {
        const response = await apiService.post('/education/courses', data);
        return (response as any).data;
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
        const response = await apiService.put(`/education/courses/${id}`, data);
        return (response as any).data;
    }

    async deleteCourse(id: string): Promise<void> {
        await apiService.delete(`/education/courses/${id}`);
    }

    // --- Lecturers ---
    async getLecturers(): Promise<Lecturer[]> {
        const response = await apiService.get('/education/lecturers');
        return (response as any).data;
    }

    async createLecturer(data: Partial<Lecturer>): Promise<Lecturer> {
        const response = await apiService.post('/education/lecturers', data);
        return (response as any).data;
    }

    // --- Enrollments ---
    async getEnrollments(userId?: string): Promise<Enrollment[]> {
        const response = await apiService.get('/education/enrollments', { params: { userId } });
        return (response as any).data;
    }

    async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
        const response = await apiService.post('/education/enrollments', { userId, courseId });
        return (response as any).data;
    }

    // --- Quizzes ---
    async getQuizzes(courseId: string): Promise<any[]> {
        const response = await apiService.get(`/education/quizzes/${courseId}`);
        return (response as any).data;
    }
}

export const educationService = new EducationService();
