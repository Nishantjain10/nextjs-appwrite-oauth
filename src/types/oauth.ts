export enum OAuthProvider {
    // Amazon OAuth
    // Scopes:
    // - 'profile': Basic profile information
    // - 'email': Email address
    // Docs: https://developer.amazon.com/docs/login-with-amazon/customer-profile.html
    Amazon = 'amazon',

    // Discord OAuth
    // Scopes:
    // - 'identify': Access user's username, avatar, etc.
    // - 'email': Access user's email
    // - 'guilds': Access user's guilds/servers (optional)
    // Docs: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
    Discord = 'discord',

    // Notion OAuth
    // Scopes:
    // - 'basic': Read user info (workspace name, avatar)
    // - 'page:read': Read pages (optional)
    // - 'page:write': Modify pages (optional)
    // Docs: https://developers.notion.com/docs/authorization#scopes
    Notion = 'notion',

    // Google OAuth
    // Scopes:
    // - 'profile': Basic profile info
    // - 'email': Email address
    // - 'openid': OpenID Connect
    // Docs: https://developers.google.com/identity/protocols/oauth2/scopes
    Google = 'google',

    // GitHub OAuth
    // Scopes:
    // - 'user': Read user info
    // - 'user:email': Access email
    // - 'repo': Repository access (optional)
    // Docs: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
    GitHub = 'github'
} 