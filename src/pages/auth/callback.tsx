import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CallbackPage: NextPage = () => {
    const router = useRouter();
    const { secret, userId } = router.query;

    useEffect(() => {
        if (!secret || !userId) return;

        // Call our API route instead of directly using the client SDK
        fetch(`/api/auth/callback?userId=${userId}&secret=${secret}`)
            .then(response => {
                if (response.ok) {
                    router.push('/dashboard');
                } else {
                    throw new Error('Failed to create session');
                }
            })
            .catch((error) => {
                console.error('Session error:', error);
                router.push('/auth/login');
            });
    }, [router, secret, userId]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Completing authentication...</p>
        </div>
    );
};

export default CallbackPage;

