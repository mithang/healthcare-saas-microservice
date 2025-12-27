'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { LOGIN_MUTATION, LOGOUT_MUTATION, ME_QUERY } from '@/graphql/auth';
import { resetApolloStore } from '@/lib/apollo-client';

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'citizen' | 'hospital' | 'clinic' | 'doctor' | 'super_admin' | 'admin';
    phoneNumber?: string;
    isActive: boolean;
    [key: string]: any; // Allow additional properties
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

// Helper to normalize role from Role object or string
const normalizeRole = (role: string | any): User['role'] => {
    if (typeof role === 'object' && role?.name) {
        // Map "Super Admin" -> "super_admin" if needed, but DB is seeded with correct keys now.
        // Just in case checking for spaces or uppercase if legacy data exists.
        return role.name.toLowerCase().replace(' ', '_') as User['role'];
    }
    if (!role) return 'citizen';
    return role.toLowerCase().replace(' ', '_') as User['role'];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const [loginMutation, { loading: loginLoading }] = useMutation<any>(LOGIN_MUTATION);
    const [logoutMutation] = useMutation<any>(LOGOUT_MUTATION);
    const { data: meData, loading: meLoading, refetch, error: meError } = useQuery<any>(ME_QUERY, {
        skip: !isInitialized,
        errorPolicy: 'ignore',
        fetchPolicy: 'network-only', // Always fetch fresh data
    });

    // Initialize auth state from localStorage
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch (e) {
                console.error('Failed to parse saved user:', e);
                localStorage.removeItem('user');
                localStorage.removeItem('auth_token');
            }
        }
        setIsInitialized(true);
    }, []);

    // Handle ME query errors
    useEffect(() => {
        if (meError) {
            console.error('ME query error:', meError);
            // If there's an error fetching user data, clear auth state
            if (meError.message.includes('Unauthorized') || meError.message.includes('401')) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                setUser(null);
            }
        }
    }, [meError]);

    // Update user from ME query
    useEffect(() => {
        if (meData?.me) {
            const normalizedUser: User = {
                ...meData.me,
                role: normalizeRole(meData.me.role),
            };
            setUser(normalizedUser);
            localStorage.setItem('user', JSON.stringify(normalizedUser));
        }
    }, [meData]);

    const login = async (identifier: string, password: string) => {
        try {
            const { data } = await loginMutation({
                variables: {
                    input: { identifier, password },
                },
            });

            if (data?.signIn?.data) {
                const { AccessToken } = data.signIn.data;

                // Save token
                localStorage.setItem('auth_token', AccessToken);

                // Fetch user data via ME query
                const { data: meResult } = await refetch();

                if (meResult?.me) {

                    const userData: User = {
                        ...meResult.me,
                        id: meResult.me.Id || meResult.me.id,
                        email: meResult.me.Email || meResult.me.email,
                        fullName: meResult.me.FullName || meResult.me.fullName || meResult.me.UserName || '',
                        role: normalizeRole(meResult.me.role),
                        phoneNumber: meResult.me.Phone || meResult.me.phoneNumber,
                        isActive: meResult.me.IsApproved && !meResult.me.IsLockedOut && !meResult.me.IsBanned,
                    };
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);

                    // Redirect based on role
                    switch (userData.role as any) {
                        case 'super_admin':
                            router.push('/admin');
                            break;
                        case 'doctor':
                            router.push('/portal/emr');
                            break;
                        case 'hospital':
                        case 'clinic':
                            router.push('/portal/reception');
                            break;
                        case 'citizen':
                            router.push('/portal/bookings');
                            break;
                        case 'admin':
                            router.push('/portal');
                            break;
                        default:
                            router.push('/');
                    }
                } else {
                    throw new Error('Unable to fetch user information');
                }
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            // Clear any existing auth data on login failure
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setUser(null);

            // Provide more specific error messages
            if (error.message.includes('Invalid credentials')) {
                throw new Error('Email hoặc mật khẩu không đúng');
            } else if (error.message.includes('UNAUTHENTICATED') || error.message.includes('401')) {
                throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
            } else {
                throw new Error(error.message || 'Đăng nhập thất bại. Vui lòng thử lại sau');
            }
        }
    };

    const logout = async () => {
        try {
            await logoutMutation();
        } catch (error) {
            console.error('Logout error:', error);
            // Even if logout mutation fails, we still clear local state
        } finally {
            // Clear local storage and state
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setUser(null);

            // Reset Apollo store
            resetApolloStore();

            router.push('/login');
        }
    };

    const value: AuthContextType = {
        user,
        loading: !isInitialized || (isInitialized && meLoading) || loginLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
