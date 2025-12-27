'use client';

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ReactNode } from 'react';

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            
            // Handle authentication errors
            if (extensions?.code === 'UNAUTHENTICATED' || message.includes('Unauthorized')) {
                // Clear auth tokens
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                }
                
                // Redirect to login page
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        });
    }
    
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        
        // Handle 401 errors
        if (networkError.message.includes('401')) {
            // Clear auth tokens
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }
            
            // Redirect to login page
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
    }
});

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export function ApolloProviderWrapper({ children }: { children: ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

// Helper function to reset store after logout
export const resetApolloStore = async () => {
    await client.clearStore();
    await client.resetStore();
};

export { client, ApolloProviderWrapper as ApolloProvider };

