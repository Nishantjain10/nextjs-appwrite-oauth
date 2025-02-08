import { Client, Account } from 'appwrite';
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const CallbackPage: NextPage = () => {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const verifySession = async () => {
            try {
                const client = new Client()
                    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

                const account = new Account(client);
                
                // Get the current session
                const session = await account.get();
                
                if (session) {
                    setStatus('success');
                    // Redirect to dashboard or home page after successful login
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 1500);
                }
            } catch (error) {
                console.error('Session verification error:', error);
                setStatus('error');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            }
        };

        verifySession();
    }, [router]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            {status === 'loading' && <p>Verifying your login...</p>}
            {status === 'success' && <p>Login successful! Redirecting...</p>}
            {status === 'error' && <p>Authentication failed. Redirecting to login...</p>}
        </div>
    );
};

export default CallbackPage; 