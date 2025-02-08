import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';

const LoginPage: NextPage = () => {
    const handleGoogleLogin = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            // Initiate OAuth2 redirect
            await account.createOAuth2Session(
                'amazon',
                'http://localhost:3000/auth/callback',
                'http://localhost:3000/auth/login',
                ['email', 'profile'] // Add required scopes
            );
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login with Google</h1>
            <button onClick={handleGoogleLogin} className={styles.loginButton}>
                Login with Google
            </button>
        </div>
    );
};

export default LoginPage; 