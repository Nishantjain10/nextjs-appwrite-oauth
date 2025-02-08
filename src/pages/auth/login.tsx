import { NextPage } from "next";
import styles from '@/styles/Login.module.css';
import { OAuthProvider } from '@/types/oauth';
import { useCallback } from 'react';

const LoginPage: NextPage = () => {
    const handleOAuthLogin = useCallback(async (provider: OAuthProvider) => {
        try {
            // Call our API route with the correct provider
            const response = await fetch(`/api/auth/${provider}`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            if (!data.url) {
                throw new Error('No URL returned from server');
            }

            // Redirect to OAuth provider
            window.location.href = data.url;
        } catch (error) {
            console.error('Login error:', error);
        }
    }, []);

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

