import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677bd5cc003630d0aea1');

const account = new Account(client);

// Test OAuth session creation
async function testNotionAuth() {
    try {
        // Go to OAuth provider login page
        await account.createOAuth2Session(
            'notion',  // Changed to 'notion'
            'http://localhost:3000/auth/callback',
            'http://localhost:3000/auth/login'
            // Previous providers:
            // 'amazon' for Amazon
            // 'discord' for Discord
        );

        // Note: The following code won't execute immediately because createOAuth2Session
        // redirects the user to Notion's login page
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

// Export for use in other files
export { client, account };

// Only run the test if this file is being executed directly
if (require.main === module) {
    testNotionAuth(); // Changed to testNotionAuth
}
