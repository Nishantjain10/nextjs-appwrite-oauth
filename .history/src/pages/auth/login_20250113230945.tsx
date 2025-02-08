import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';

const LoginPage: NextPage = () => {
    const handleNotionLogin = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            // Initiate OAuth2 redirect for Notion
            await account.createOAuth2Session(
                'notion',  // Changed to 'notion'
                'http://localhost:3000/auth/callback',
                'http://localhost:3000/auth/login',
                // Previous providers' scopes:
                // ['profile', 'email'] // Amazon scopes
                // ['identify', 'email'] // Discord scopes
                ['basic'] // Notion scopes
            );
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login with Notion</h1>
            <button onClick={handleNotionLogin} className={styles.loginButton}>
                Login with Notion
            </button>
        </div>
    );
};

export default LoginPage;
