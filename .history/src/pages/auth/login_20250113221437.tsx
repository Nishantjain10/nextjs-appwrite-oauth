import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';

const LoginPage: NextPage = () => {
    const handleAmazonLogin = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            // Initiate OAuth2 redirect for Amazon
            await account.createOAuth2Session(
                'discord',  // Changed to 'amazon'
                'http://localhost:3000/auth/callback',
                'http://localhost:3000/auth/login',
                ['profile', 'email'] // Adjusted scopes for Amazon
                // ['email'] // Uncomment this line to roll back to Google scopes
            );
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login with Amazon</h1> {/* Updated title */}
            <button onClick={handleAmazonLogin} className={styles.loginButton}>
                Login with Amazon
            </button>
        </div>
    );
};

export default LoginPage;
