import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/auth/login');
  }, [router]);

  return null;
};

export default HomePage; 