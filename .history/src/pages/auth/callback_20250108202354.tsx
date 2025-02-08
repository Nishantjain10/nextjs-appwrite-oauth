import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CallbackPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Completing authentication...</p>
        </div>
    );
};

export default CallbackPage; 