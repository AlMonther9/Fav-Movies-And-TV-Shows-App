# Favorite Movies & TV Shows Web Application

A full-stack web application that allows users to manage their favorite movies and TV shows with CRUD operations, infinite scrolling, and a modern responsive UI.

## Features

### Core Features

- ✅ **Add New Entry**: Add movies/TV shows with detailed information
- ✅ **Display Entries**: View all entries in a responsive table format
- ✅ **Infinite Scroll**: Automatically load more entries as you scroll
- ✅ **Edit & Delete**: Update or remove entries with confirmation dialogs
- ✅ **Search & Filter**: Search by title/director/genre and filter by type
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Authentication Features

- ✅ **User Authentication**: Secure login/signup with NextAuth.js
- ✅ **Multiple Providers**: Google OAuth, GitHub OAuth, and email/password
- ✅ **Session Management**: JWT-based sessions with automatic refresh
- ✅ **Route Protection**: Protected routes with authentication guards
- ✅ **User Profiles**: Avatar display and user-specific collections
- ✅ **Password Security**: Bcrypt hashing with salt rounds
- ✅ **Account Linking**: Link multiple auth providers to one account

### Technical Features

- ✅ **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- ✅ **Form Validation**: Client-side validation with error handling
- ✅ **Loading States**: Smooth loading indicators and transitions
- ✅ **Toast Notifications**: User feedback for all actions
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Technology Stack

### Frontend

- **React 18** with TypeScript
- **Next.js 15** (App Router)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Authentication

- **NextAuth.js** for authentication
- **Prisma ORM** with PostgreSQL
- **bcryptjs** for password hashing
- **JWT** for session management

### Backend

- **Next.js API Routes** (RESTful endpoints)
- **MySQL** database (schema provided)
- **Prisma ORM** (configuration included)
- **Zod** for schema validation

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (we recommend Neon)
- pnpm
- OAuth provider credentials (optional)

### Installation

1. **Clone the repository**
   \`\`\`bash
   [Clone the repository](https://github.com/AlMonther9/Fav-Movies-And-TV-Shows-App)
   cd Fav-Movies-And-TV-Shows-App
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Set up the database**

   **Option A: Neon (Recommended)**

   - Go to [neon.tech](https://neon.tech) and create a free account
   - Create a new project and copy the connection string
   - The URL looks like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb`

   **Option B: Local PostgreSQL**

   - Install PostgreSQL locally
   - Create a database named `CyberLib`

4. **Configure environment variables**
   Create a `.env.local` file:
   \`\`\`env

   # Database

   DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

   # NextAuth.js

   NEXTAUTH_SECRET="your-super-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers (Optional)

   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   \`\`\`

5. **Set up OAuth providers** (Optional)

   **Google OAuth:**

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

   **GitHub OAuth:**

   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`

6. **Initialize the database**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

7. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### Users & Authentication

- `User` - User accounts with name, email, and profile info
- `Account` - OAuth provider accounts linked to users
- `Session` - Active user sessions
- `VerificationToken` - Email verification tokens

### Media Collection

- `MediaEntry` - User's favorite movies and TV shows
  - Linked to specific users via `userId`
  - All existing fields (title, type, director, etc.)
  - User-specific collections and privacy

## API Endpoints

### Authentication

- `GET/POST /api/auth/*` - NextAuth.js authentication endpoints
- `POST /api/auth/register` - User registration with email/password

### Media Management

- `GET /api/media` - Fetch user's media entries (authenticated)
- `POST /api/media` - Create new media entry (authenticated)
- `PUT /api/media/[id]` - Update media entry (authenticated, owner only)
- `DELETE /api/media/[id]` - Delete media entry (authenticated, owner only)

## Project Structure

\`\`\`
├── app/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── [...nextauth]/route.ts # NextAuth.js handler
│ │ │ └── register/route.ts # User registration
│ │ └── media/ # Media API routes
│ ├── auth/
│ │ ├── signin/page.tsx # Sign in page
│ │ └── signup/page.tsx # Sign up page
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── auth/ # Authentication components
│ │ ├── auth-guard.tsx
│ │ ├── auth-provider.tsx
│ │ ├── signin-form.tsx
│ │ ├── signup-form.tsx
│ │ └── user-menu.tsx
│ └── ui/ # shadcn/ui components
├── lib/
│ ├── auth.ts # NextAuth.js configuration
│ ├── prisma.ts # Prisma client
│ └── utils.ts
├── prisma/
│ └── schema.prisma # Database schema
├── package.json
├── tailwind.config.ts
└── README.md
\`\`\`

## Authentication

### Sign Up / Sign In

- **Email/Password**: Create account with email and secure password
- **Google OAuth**: Sign in with your Google account
- **GitHub OAuth**: Sign in with your GitHub account
- **Account Linking**: Link multiple providers to one account

### User Sessions

- **Persistent Sessions**: Stay logged in across browser sessions
- **Automatic Refresh**: JWT tokens refresh automatically
- **Secure Sign Out**: Proper session cleanup on logout

### Route Protection

- **Protected Routes**: Main app requires authentication
- **Automatic Redirects**: Unauthenticated users redirected to sign in
- **Loading States**: Smooth authentication state transitions

## Usage

### Getting Started

1. **Sign up** for a new account or **sign in** with existing credentials
2. Choose from email/password, Google, or GitHub authentication
3. Access your personal CyberLib collection

### Managing Your Collection

[Keep existing usage instructions but mention they're now user-specific]

### Adding Entries

1. Click "Add New Entry" button
2. Fill in the required fields (Title, Type, Director)
3. Add optional details (Budget, Location, Duration, etc.)
4. Click "Add Entry" to save

### Editing Entries

1. Click the edit icon (pencil) in the Actions column
2. Modify the fields in the dialog
3. Click "Update Entry" to save changes

### Deleting Entries

1. Click the delete icon (trash) in the Actions column
2. Confirm deletion in the alert dialog
3. Entry will be permanently removed

### Search & Filter

- Use the search bar to find entries by title, director, or genre
- Use the filter dropdown to show only Movies or TV Shows
- Combine search and filter for precise results

## Deployment

### Frontend (Vercel)

\`\`\`bash
npm run build

# Deploy to Vercel via GitHub integration or CLI

\`\`\`

### Backend Options

- **Vercel**: Deploy with Vercel Postgres or PlanetScale
- **Railway**: Deploy with Railway MySQL
- **Render**: Deploy with Render PostgreSQL
- **AWS**: Deploy with RDS MySQL

### Environment Variables for Production

\`\`\`env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
\`\`\`

## Future Enhancements

### Authentication & User Features

- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Two-factor authentication (2FA)
- [ ] Social features (sharing collections)
- [ ] Role-based access control
- [x] ~~User authentication (login/signup/logout)~~
- [x] ~~OAuth providers (Google, GitHub)~~
- [x] ~~User-specific collections~~

### Planned Features

- [ ] Image upload for movie/show posters
- [ ] Advanced search with multiple filters
- [ ] Export data to CSV/JSON
- [ ] Watchlist and favorites categories
- [ ] Social features (sharing, reviews)
- [ ] Dark/light theme toggle
- [ ] Bulk operations (delete multiple)

### Technical Improvements

- [ ] Real-time updates with WebSockets
- [ ] Caching with Redis
- [ ] Image optimization and CDN
- [ ] Progressive Web App (PWA)
- [ ] Unit and integration tests
- [ ] Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or create an issue in the GitHub repository.
