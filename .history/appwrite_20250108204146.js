import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677bd5cc003630d0aea1');

const account = new Account(client);

// Test OAuth session creation
async function testGoogleAuth() {
    try {
        // 1. First create OAuth2 session
        await account.createOAuth2Session(
            'google',  // provider
            'http://localhost:3000/auth/callback', // success URL
            'http://localhost:3000/auth/login'     // failure URL
        );

        // 2. After successful OAuth login, get the session info
        const session = await account.getSession('current');
        
        // 3. Log provider information as shown in documentation
        console.log('Provider:', session.provider);
        console.log('Provider UID:', session.providerUid);
        console.log('Provider Access Token:', session.providerAccessToken);
        console.log('Token Expiry:', session.providerAccessTokenExpiry);

    } catch (error) {
        console.error('Auth error:', error);
    }
}

// Export for use in other files
export { client, account };

// Only run the test if directly executed
if (require.main === module) {
    testGoogleAuth();
}
