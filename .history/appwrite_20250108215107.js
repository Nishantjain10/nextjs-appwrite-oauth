import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677bd5cc003630d0aea1');

const account = new Account(client);

// Test OAuth session creation
async function testGoogleAuth() {
    try {
        // Create OAuth2 session with Google
        const session = await account.createOAuth2Session(
            'google',
            'http://localhost:3000/auth/callback',
            'http://localhost:3000/auth/login',
            ['email', 'profile'] // Add required Google OAuth scopes
        );

        // Get account details after OAuth
        const accountDetails = await account.get();
        console.log('Account Details:', accountDetails);

    } catch (error) {
        if (error.code === 401) {
            console.log('Please complete the OAuth login flow in your browser');
        } else {
            console.error('Auth error:', error);
        }
    }
}

// Export for use in other files
export { client, account };

// Run test if executed directly
if (require.main === module) {
    testGoogleAuth();
}
