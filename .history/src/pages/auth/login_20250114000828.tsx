import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';
import { OAuthProvider, OAuthScope } from '@/types/oauth';

const LoginPage: NextPage = () => {
    const handleAmazonLogin = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            await account.createOAuth2Session(
                OAuthProvider.AMAZON,
                'http://localhost:3000/auth/callback',
                'http://localhost:3000/auth/login',
                OAuthScope[OAuthProvider.AMAZON]
            );
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login with {OAuthProvider.AMAZON}</h1>
            <button onClick={handleAmazonLogin} className={styles.loginButton}>
                Login with {OAuthProvider.AMAZON}
            </button>
        </div>
    );
};

export default LoginPage;
