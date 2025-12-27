// API Service for Authentication
const API_BASE_URL = 'http://localhost:3000';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
    role: 'citizen' | 'hospital' | 'clinic' | 'doctor' | 'super_admin';
    phoneNumber?: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        role: string;
    };
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    }

    async register(data: RegisterData): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    }

    async getProfile(token: string): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get profile');
        }

        return response.json();
    }

    saveToken(token: string): void {
        localStorage.setItem('auth_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    removeToken(): void {
        localStorage.removeItem('auth_token');
    }

    saveUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    removeUser(): void {
        localStorage.removeItem('user');
    }

    logout(): void {
        this.removeToken();
        this.removeUser();
    }
}

export const authService = new AuthService();
