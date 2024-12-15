# DeFi Savings Wallet

A secure, non-custodial wallet application for managing cross-chain DeFi savings, built with React, TypeScript, and Turnkey.

![DeFi Savings Wallet](./src/assets/screenshot.png)

## Features

- 🔐 **Secure Authentication**: Multiple authentication methods using Firebase
- 🌐 **Multi-Chain Support**: Seamlessly manage assets across Ethereum, BSC, and Polygon networks
- 💰 **DeFi Integration**: Access top DeFi protocols for optimal yields
- 🔑 **Non-Custodial**: Full control over your private keys using Turnkey's secure infrastructure
- 🚀 **Modern Stack**: Built with React, TypeScript, Tailwind CSS, and Vite

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Authentication**: Firebase Auth
- **Wallet Infrastructure**: Turnkey
- **State Management**: Zustand
- **Icons**: Lucide React

## Live Demo

Check out the live app here: [DeFi Savings Wallet](https://incredible-treacle-5bc810.netlify.app/)

## Project Structure

```
src/
├── components/         # React components
│   ├── auth/          # Authentication components
│   └── wallet/        # Wallet-related components
├── lib/               # Core library code
│   ├── api/           # API client and utilities
│   ├── firebase/      # Firebase configuration
│   ├── services/      # Business logic services
│   ├── turnkey/       # Turnkey integration
│   └── utils/         # Utility functions
├── pages/             # Page components
└── types/             # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Turnkey account and API keys

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/defi-savings-wallet.git
   cd defi-savings-wallet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_TURNKEY_API_BASE_URL=your_turnkey_api_url
   VITE_TURNKEY_ORGANIZATION_ID=your_organization_id
   VITE_TURNKEY_API_PUBLIC_KEY=your_public_key
   VITE_TURNKEY_API_PRIVATE_KEY=your_private_key

   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Architecture

### Frontend Architecture

The application follows a modular architecture with clear separation of concerns:

- **Components**: Reusable UI components
- **Pages**: Route-specific page components
- **Services**: Business logic and API interactions
- **Stores**: Global state management using Zustand
- **Utils**: Helper functions and utilities

### Wallet Integration

The wallet integration is built on Turnkey's infrastructure:

- Non-custodial wallet creation
- Secure transaction signing
- Multi-chain support
- Activity-based operations

### Authentication Flow

1. User signs in using Firebase Authentication
2. Authentication state is managed by Zustand store
3. Protected routes require authentication
4. Wallet operations require both authentication and authorization

## Security

- Environment variables for sensitive data
- Firebase Authentication for user management
- Turnkey for secure wallet operations
- Request signing for API calls
- Input validation and sanitization
- Protected routes and components

 ## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Acknowledgments
Turnkey for wallet infrastructure
Firebase for authentication
Tailwind CSS for styling
Lucide for icons
Developed by Techy2419
