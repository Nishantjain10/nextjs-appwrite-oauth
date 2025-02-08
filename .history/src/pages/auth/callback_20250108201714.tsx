import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CallbackPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Short delay before redirecting to dashboard
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    }, [router]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Processing login... Please wait.</p>
        </div>
    );
};

export default CallbackPage; 