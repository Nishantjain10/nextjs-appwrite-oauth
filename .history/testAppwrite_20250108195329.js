import { Client, Account, OAuthProvider } from "appwrite";
import { useEffect } from "react";

const TestAppwrite = () => {
    useEffect(() => {
        const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
            .setProject('<PROJECT_ID>');                 // Your project ID

        const account = new Account(client);

        // Go to OAuth provider login page
        account.createOAuth2Session(
            OAuthProvider.Github, // provider
            'https://example.com/success', // redirect here on success
            'https://example.com/failed', // redirect here on failure
            ['repo', 'user'] // scopes (optional)
        ).then(() => {
            console.log("OAuth2 session created successfully.");
        }).catch((error) => {
            console.error("Error creating OAuth2 session:", error);
        });
    }, []);

    return (
        <div>
            <h1>Test Appwrite OAuth2</h1>
            <p>Check the console for OAuth2 session status.</p>
        </div>
    );
};

export default TestAppwrite; 