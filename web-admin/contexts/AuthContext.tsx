'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    userId: string | null;
    email: string | null;
    login: (userId: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    userId: null,
    email: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Load from local storage on mount
        const storedUserId = localStorage.getItem('userId');
        const storedEmail = localStorage.getItem('userEmail');
        if (storedUserId) setUserId(storedUserId);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const login = (id: string, userEmail: string) => {
        localStorage.setItem('userId', id);
        localStorage.setItem('userEmail', userEmail);
        setUserId(id);
        setEmail(userEmail);
        router.push('/'); // Redirect to dashboard
    };

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        setUserId(null);
        setEmail(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ userId, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
