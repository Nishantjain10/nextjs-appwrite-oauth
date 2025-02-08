import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';
import { OAuthProvider } from '@/types/oauth';
import { useCallback } from 'react';

const LoginPage: NextPage = () => {
    // Get the base URL dynamically
    const baseUrl = typeof window !== 'undefined' 
        ? `${window.location.protocol}//${window.location.host}`
        : 'http://localhost:3000';

    const handleOAuthLogin = useCallback(async (provider: OAuthProvider) => {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            // For available OAuth providers and their scopes,
            // check src/types/oauth.ts
            const scopes = {
                [OAuthProvider.Amazon]: ['profile'],
                [OAuthProvider.Discord]: ['identify', 'email'],
                [OAuthProvider.Notion]: ['basic'],
                [OAuthProvider.Google]: ['profile', 'email', 'openid'],
                [OAuthProvider.GitHub]: ['user', 'user:email']
            };

            await account.createOAuth2Session(
                provider,
                `${baseUrl}/auth/callback`,
                `${baseUrl}/auth/login`,
                scopes[provider]
            );
        } catch (error) {
            console.error('Login error:', error);
        }
    }, [baseUrl]);

    return (
        <div className={styles.container}>
            <h1>Login with OAuth</h1>
            <div className={styles.buttonGrid}>
                {Object.values(OAuthProvider).map((provider) => (
                    <button
                        key={provider}
                        onClick={() => handleOAuthLogin(provider)}
                        className={styles.loginButton}
                    >
                        Login with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoginPage;
