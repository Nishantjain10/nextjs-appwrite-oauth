# Next.js Appwrite OAuth2 Implementation

A simple and clean implementation of OAuth2 authentication using Appwrite in a Next.js application. This project demonstrates how to handle OAuth2 flows with multiple providers including Amazon, Discord, Google, GitHub, and Notion.

## 🚀 Features

- ✨ Multiple OAuth Providers (Amazon, Discord, Google, GitHub, Notion)
- 🔒 Secure Authentication Flow
- 🎯 TypeScript Support
- 📱 Responsive Design
- 🔄 Session Management
- 🎨 Clean UI

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Appwrite Account
- OAuth Provider Credentials

## 🌟 Available Implementations

This repository has two implementations:
- `main` branch: Client-side OAuth implementation
- `feat/ssr-oauth` branch: Server-side rendering (SSR) implementation

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-appwrite-oauth
   cd nextjs-appwrite-oauth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy `.env.example` to `.env.local` and update the values:
   ```bash
   cp .env.example .env.local
   ```

   Update the following variables in `.env.local`:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here  # Get this from Appwrite Console
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
.
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── callback.tsx    # OAuth callback handler
│   │   │   └── login.tsx       # Login page
│   │   ├── dashboard.tsx       # Protected dashboard
│   │   ├── _app.tsx           # App component
│   │   └── index.tsx          # Home page
│   ├── styles/
│   │   └── Login.module.css   # Login styles
│   └── types/
│       └── oauth.ts           # OAuth types
├── .env.example              # Example environment variables
├── .env.local                # Environment variables (git-ignored)
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🔐 OAuth Flow

1. User clicks "Login with [Provider]"
2. User is redirected to provider's login page
3. After successful authentication, provider redirects back to callback URL
4. Application verifies the session and redirects to dashboard

## ⚙️ Appwrite Configuration

1. **Create an Appwrite Project**
   - Go to [Appwrite Console](https://cloud.appwrite.io)
   - Create a new project
   - Copy your Project ID and endpointto `.env.local`

2. **Configure OAuth Providers**
   - In your project's settings, go to Authentication > OAuth2 providers
   - Enable and configure your desired providers:
     ```
     - Amazon
     - Discord
     - Google
     - GitHub
     - Notion
     ```
   - Add callback URL: `http://localhost:3000/auth/callback`

3. **CORS Settings**
   - Add your application domain to the allowed domains list
   - For development: `http://localhost:3000`

## 🔧 OAuth Provider Setup

### Amazon OAuth
```typescript
await account.createOAuth2Session(
    OAuthProvider.Amazon,
    'http://localhost:3000/auth/callback',
    'http://localhost:3000/auth/login',
    ['profile', 'email']
);
```

### Discord OAuth
```typescript
await account.createOAuth2Session(
    OAuthProvider.Discord,
    'http://localhost:3000/auth/callback',
    'http://localhost:3000/auth/login',
    ['identify', 'email']
);
```

### Notion OAuth
```typescript
await account.createOAuth2Session(
    OAuthProvider.Notion,
    'http://localhost:3000/auth/callback',
    'http://localhost:3000/auth/login',
    ['basic']
);
```

## 🔍 Type Safety

We use TypeScript enum for OAuth providers:
```typescript
export enum OAuthProvider {
    Amazon = 'amazon',
    Discord = 'discord',
    Notion = 'notion',
    Google = 'google',
    GitHub = 'github'
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid OAuth provider"**
   - Ensure the provider is enabled in Appwrite console
   - Check if the provider name matches the enum value

2. **"Invalid redirect URI"**
   - Verify callback URL in both Appwrite and provider settings
   - Check for exact match including protocol (http/https)

3. **"Session not found"**
   - Clear browser cookies and try again
   - Check if the provider's cookies are being blocked

## 🔒 Security Considerations

- Environment variables are properly handled
- OAuth state parameter is managed by Appwrite
- Secure session management
- Protected dashboard routes
- Type-safe implementation

## 📱 Responsive Design

The login page is responsive and works on:
- Desktop browsers
- Mobile devices
- Tablets
- Different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the backend service
- [Next.js](https://nextjs.org/) for the React framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- All OAuth providers for their services

## 📫 Support

For support:
- Open an [issue](https://github.com/yourusername/nextjs-appwrite-oauth/issues)
- Check [Appwrite Documentation](https://appwrite.io/docs)
- Join [Appwrite Discord](https://discord.gg/appwrite)

## ✨ Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/yourusername">
        <img src="https://github.com/yourusername.png" width="100px;" alt=""/>
        <br />
        <sub><b>Your Name</b></sub>
      </a>
    </td>
  </tr>
</table>

---
Built with ❤️ using Next.js and Appwrite 