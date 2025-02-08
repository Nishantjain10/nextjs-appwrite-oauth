import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
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
                
                setLoading(false);
            } catch (error) {
                console.error('Session error:', error);
                router.push('/auth/login');
            }
        };

        checkSession();
    }, [router]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading session information...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>Successfully authenticated!</p>
        </div>
    );
};

export default DashboardPage; 