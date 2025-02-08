import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CallbackPage: NextPage = () => {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const getSession = async () => {
            try {
                const client = new Client()
                    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

                const account = new Account(client);
                
                // Get session information
                const session = await account.getSession('current');
                
                // Log provider information
                console.log('Provider:', session.provider);
                console.log('Provider UID:', session.providerUid);
                console.log('Provider Access Token:', session.providerAccessToken);
                
                setStatus('success');
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1500);
            } catch (error) {
                console.error('Session error:', error);
                setStatus('error');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            }
        };

        getSession();
    }, [router]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            {status === 'loading' && <p>Getting session information...</p>}
            {status === 'success' && <p>Session verified! Redirecting...</p>}
            {status === 'error' && <p>Session verification failed. Redirecting to login...</p>}
        </div>
    );
};

export default CallbackPage; 