import { Client, Account } from '@appwrite.io/web';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const client = new Client()
          .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
          .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

        const account = new Account(client);
        const user = await account.get();
        setUserName(user.name);
      } catch (error) {
        console.error('Session error:', error);
        router.push('/auth/login');
      }
    };

    checkSession();
  }, [router]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {userName && <p>Welcome, {userName}!</p>}
    </div>
  );
};

export default DashboardPage; 