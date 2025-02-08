import { Client, Account } from 'node-appwrite';
import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuthProvider } from '@/types/oauth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { provider } = req.query;
    
    // Validate provider
    if (!provider || typeof provider !== 'string' || !Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
        return res.status(400).json({ error: 'Invalid provider' });
    }

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
        .setKey(process.env.APPWRITE_API_KEY || ''); // Server API key

    const account = new Account(client);

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        
        // Get the OAuth URL
        const session = await account.createOAuth2Token(
            provider,
            `${baseUrl}/auth/callback`,
            `${baseUrl}/auth/login`,
        );

        // Return the URL string directly
        res.status(200).json({ url: session.toString() });
    } catch (error) {
        console.error('OAuth error:', error);
        res.status(500).json({ error: 'Failed to initialize OAuth' });
    }
} 