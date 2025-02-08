import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);
        
        // Just get account info
        account.get()
            .then((response) => {
                console.log('Logged in:', response);
                setUserData(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Auth error:', error);
                router.push('/auth/login');
            });
    }, [router]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <div>
                <p>User ID: {userData.$id}</p>
                <p>Email: {userData.email}</p>
                <p>Created: {new Date(userData.$createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default DashboardPage;