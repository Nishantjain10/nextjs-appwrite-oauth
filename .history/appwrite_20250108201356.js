import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('677bd5cc003630d0aea1');                 // Your project ID

const account = new Account(client);

// Go to OAuth provider login page
account.createOAuth2Session(
    OAuthProvider.Github, // provider
    'https://example.com/success', // redirect here on success
    'https://example.com/failed', // redirect here on failure
    ['repo', 'user'] // scopes (optional)
);
