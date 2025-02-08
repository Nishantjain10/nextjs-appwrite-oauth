export enum OAuthProvider {
    AMAZON = 'amazon',
    DISCORD = 'discord',
    NOTION = 'notion',
    GOOGLE = 'google'
}

export interface OAuthScope {
    [OAuthProvider.AMAZON]: ['profile', 'email'];
    [OAuthProvider.DISCORD]: ['identify', 'email'];
    [OAuthProvider.NOTION]: ['basic'];
    [OAuthProvider.GOOGLE]: ['email', 'profile'];
} 