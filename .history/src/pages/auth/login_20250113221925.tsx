import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import styles from '@/styles/Login.module.css';

const LoginPage: NextPage = () => {
    const handleDiscordLogin = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

            const account = new Account(client);

            // Initiate OAuth2 redirect for Discord
            await account.createOAuth2Session(
                'discord',  // Changed to 'discord'
                'http://localhost:3000/auth/callback',
                'http://localhost:3000/auth/login',
                ['identify', 'email'] // Adjusted scopes for Discord
            );
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Login with Discord</h1> {/* Updated title */}
            <button onClick={handleDiscordLogin} className={styles.loginButton}>
                Login with Discord
            </button>
        </div>
    );
};

export default LoginPage;
