import { Client, Account } from 'appwrite';
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CallbackPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);
        
        // Get session information after OAuth redirect
        account.getSession('current')
            .then(session => {
                console.log('Session details:', {
                    provider: session.provider,
                    providerUid: session.providerUid,
                    providerAccessToken: session.providerAccessToken
                });
                router.push('/dashboard');
            })
            .catch(error => {
                console.error('Session error:', error);
                router.push('/auth/login');
            });
    }, [router]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Completing authentication...</p>
        </div>
    );
};

export default CallbackPage; 