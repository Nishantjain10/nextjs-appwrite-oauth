import { Client, Account, <OauthProvider></OauthProvider> } from 'appwrite';
import { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';

const LoginPage: NextPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGithubLogin = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            await account.createOAuth2Session(
                OAuthProvider.Github,
                `${window.location.origin}/auth/callback`, // Success URL
                `${window.location.origin}/auth/login`,    // Failure URL
                ['repo', 'user']
            );
        } catch (err) {
            console.error('Login error:', err);
            setError('Failed to initialize login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login with GitHub</h1>
            
            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}
            
            <button 
                onClick={handleGithubLogin}
                disabled={loading}
                className={styles.loginButton}
            >
                {loading ? 'Connecting...' : 'Login with GitHub'}
            </button>
        </div>
    );
};

export default LoginPage; 