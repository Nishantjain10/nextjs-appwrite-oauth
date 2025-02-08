import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const client = new Client()
                    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
                    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

                const account = new Account(client);
                const user = await account.get();
                
                setUserData(user);
                setLoading(false);
            } catch (error) {
                console.error('Auth error:', error);
                router.push('/auth/login');
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            {userData && (
                <div>
                    <p>Welcome, {userData.name}!</p>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage; 