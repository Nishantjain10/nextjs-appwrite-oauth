import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);
        
        // First try to create a session
        account.createAnonymousSession()
            .then(() => {
                // After creating session, get account info
                return account.get();
            })
            .then((response) => {
                console.log('Logged in:', response);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Auth error:', error);
                setError(error.message);
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            });
    }, [router]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Verifying authentication...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Authentication failed. Redirecting to login...</p>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>You are logged in!</p>
        </div>
    );
};

export default DashboardPage; 