"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL queries
const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      fullName
      role
      phoneNumber
      isActive
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      message
      data {
        AccessToken
        ExpiresIn
        TokenType
        IdToken
        RefreshToken
      }
    }
  }
`;

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phoneNumber?: string;
  isActive: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { data: meData, loading: meLoading, refetch: refetchMe } = useQuery(ME_QUERY, {
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  });

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    // Check auth status
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    } else if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  useEffect(() => {
    // Update user data when me query returns data
    if (meData?.me) {
      setUser({
        id: meData.me.id,
        email: meData.me.email,
        fullName: meData.me.fullName,
        role: meData.me.role,
        phoneNumber: meData.me.phoneNumber,
        isActive: meData.me.isActive,
      });
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(meData.me));
    }
  }, [meData]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: { identifier: email, password },
        },
      });

      if (data?.signIn?.data) {
        const { AccessToken } = data.signIn.data;
        
        // Save token
        localStorage.setItem('auth_token', AccessToken);
        setIsAuthenticated(true);
        
        // Fetch user data from ME query
        await refetchMe();
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      loading: loginLoading || meLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
