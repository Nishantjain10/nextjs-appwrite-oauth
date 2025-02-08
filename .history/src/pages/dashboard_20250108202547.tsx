import { Client, Account } from 'appwrite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface UserData {
    $id: string;
    name: string;
    registration: string;
    $createdAt: string;
    $updatedAt: string;
}

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);
        
        account.createAnonymousSession()
            .then(() => {
                return account.get();
            })
            .then((response) => {
                console.log('Logged in:', response);
                setUserData(response);
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

    const handleLogout = () => {
        router.push('/auth/login');
    };

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
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
            
            {userData && (
                <div style={{ marginTop: '2rem' }}>
                    <h2>User Information</h2>
                    <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        marginTop: '1rem'
                    }}>
                        <p><strong>User ID:</strong> {userData.$id}</p>
                        <p><strong>Created:</strong> {new Date(userData.$createdAt).toLocaleString()}</p>
                        <p><strong>Last Updated:</strong> {new Date(userData.$updatedAt).toLocaleString()}</p>
                        <p><strong>Registration Date:</strong> {new Date(userData.registration).toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage; 