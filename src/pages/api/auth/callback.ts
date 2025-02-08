import { Client, Account } from 'node-appwrite';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId, secret } = req.query;

    if (!userId || !secret) {
        return res.status(400).json({ error: 'Missing userId or secret' });
    }

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
        .setKey(process.env.APPWRITE_API_KEY || '');

    const account = new Account(client);

    try {
        const session = await account.createSession(
            userId as string,
            secret as string
        );

        // Set the session cookie
        res.setHeader('Set-Cookie', [
            `session=${session.secret}; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=${new Date(session.expire).toUTCString()}`
        ]);

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Session error:', error);
        res.redirect('/auth/login');
    }
} 