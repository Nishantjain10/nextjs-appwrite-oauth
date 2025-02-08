import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashboardPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);
        
        // Check if we're logged in
        account.get()
            .then((response) => {
                console.log('Logged in:', response);
            })
            .catch(() => {
                router.push('/auth/login');
            });
    }, [router]);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>You are logged in!</p>
        </div>
    );
};

export default DashboardPage; 