import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);

        // Check if user is logged in
        account.get()
            .then(response => {
                console.log('User:', response);
                setLoading(false);
            })
            .catch(() => {
                // If not logged in, redirect to login
                router.push('/auth/login');
            });
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Successfully authenticated!</p>
        </div>
    );
};

export default DashboardPage;