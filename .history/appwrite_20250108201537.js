import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677bd5cc003630d0aea1');

const account = new Account(client);

// Test OAuth session creation
async function testGoogleAuth() {
    try {
        // Create OAuth session
        await account.createOAuth2Session(
            'google',  // provider
            'http://localhost:3000/auth/callback', // success URL
            'http://localhost:3000/auth/login',    // failure URL
            ['profile', 'email'] // scopes for Google
        );

        // Test session retrieval
        const session = await account.getSession('current');
        console.log('Session details:', {
            provider: session.provider,
            providerUid: session.providerUid,
            providerAccessToken: session.providerAccessToken
        });

    } catch (error) {
        console.error('Auth error:', error);
    }
}

// Run the test
testGoogleAuth();

export { client, account };
