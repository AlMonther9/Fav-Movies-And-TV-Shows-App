# CyberLib - Digital Entertainment Collection

A full-stack web application that allows users to manage their favorite movies and TV shows with CRUD operations, infinite scrolling, and a modern cyberpunk-themed responsive UI.

## Features

### Core Features

- ✅ **Personal Collection**: Build your own digital library of favorite movies and TV shows
- ✅ **Starter Collection**: New users get a curated collection of cyberpunk classics to start with
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
- ✅ **Auto-Seeding**: New users automatically get a starter collection

### Technical Features

- ✅ **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- ✅ **Cyberpunk Theme**: Dark/light theme with neon accents and animations
- ✅ **Form Validation**: Client-side validation with error handling
- ✅ **Loading States**: Smooth loading indicators and transitions
- ✅ **Toast Notifications**: User feedback for all actions
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- ✅ **Real Database**: Connected to PostgreSQL with Prisma ORM
- ✅ **API Security**: Protected endpoints with user authentication

## Technology Stack

### Frontend

- **React 18** with TypeScript
- **Next.js 15** (App Router)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **next-themes** for theme switching

### Authentication & Database

- **NextAuth.js** for authentication
- **Prisma ORM** with PostgreSQL
- **bcryptjs** for password hashing
- **JWT** for session management

### Backend

- **Next.js API Routes** (RESTful endpoints)
- **PostgreSQL** database
- **Zod** for schema validation
- **Server-side authentication** with session management

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (we recommend Neon)
- npm or yarn
- OAuth provider credentials (optional)

### Installation

1. **Clone the repository**
   \`\`\`bash
   [Clone the repository](https://github.com/AlMonther9/Fav-Movies-And-TV-Shows-App)
   cd Fav-Movies-And-TV-Shows-App
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up the database**

   **Option A: Neon (Recommended)**

   - Go to [neon.tech](https://neon.tech) and create a free account
   - Create a new project and copy the connection string
   - The URL looks like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb`

   **Option B: Local PostgreSQL**

   - Install PostgreSQL locally
   - Create a database named `cyberlib`

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
  - Support for global/starter entries with `isGlobal` flag
  - Reference to original global entries with `globalId`
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

### User Management

- `POST /api/seed-user` - Seed user's collection with starter entries

## Project Structure

\`\`\`
├── app/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── [...nextauth]/route.ts # NextAuth.js handler
│ │ │ └── register/route.ts # User registration
│ │ ├── media/ # Media API routes
│ │ └── seed-user/route.ts # User seeding endpoint
│ ├── auth/
│ │ ├── signin/page.tsx # Sign in page
│ │ └── signup/page.tsx # Sign up page
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── admin/
│ │ └── seed-button.tsx # Starter collection button
│ ├── auth/ # Authentication components
│ │ ├── auth-guard.tsx
│ │ ├── auth-provider.tsx
│ │ ├── signin-form.tsx
│ │ ├── signup-form.tsx
│ │ └── user-menu.tsx
│ ├── landing/
│ │ └── landing-page.tsx # Landing page for unauthenticated users
│ └── ui/ # shadcn/ui components
├── hooks/
│ ├── use-media.ts # Media management hook
│ └── use-toast.ts # Toast notifications
├── lib/
│ ├── api.ts # API client
│ ├── auth.ts # NextAuth.js configuration
│ ├── prisma.ts # Prisma client
│ └── seed-user.ts # User seeding logic
├── prisma/
│ └── schema.prisma # Database schema
├── types/
│ ├── media.ts # Media type definitions
│ └── next-auth.d.ts # NextAuth type extensions
├── package.json
├── tailwind.config.ts
└── README.md
\`\`\`

## User Experience

### New User Journey

1. **Landing Page**: Beautiful cyberpunk-themed landing page with features overview
2. **Sign Up**: Choose from email/password, Google, or GitHub authentication
3. **Starter Collection**: Automatically receive a curated collection of cyberpunk classics
4. **Personalization**: Add, edit, and organize your own favorite movies and shows

### Existing User Experience

- **Instant Access**: Fast authentication with persistent sessions
- **Personal Collection**: Your movies and shows are private and secure
- **Starter Collection**: Option to add starter collection if desired
- **Seamless Sync**: Changes are saved instantly with real-time feedback

### Managing Your Collection

#### Adding Entries

1. Click "Add New Entry" button
2. Fill in the required fields (Title, Type, Director)
3. Add optional details (Budget, Location, Duration, etc.)
4. Click "Create Entry" to save

#### Editing Entries

1. Click the edit icon (pencil) in the Actions column
2. Modify the fields in the dialog
3. Click "Update Entry" to save changes

#### Deleting Entries

1. Click the delete icon (trash) in the Actions column
2. Confirm deletion in the alert dialog
3. Entry will be permanently removed

#### Search & Filter

- Use the search bar to find entries by title, director, or genre
- Use the filter dropdown to show only Movies or TV Shows
- Combine search and filter for precise results

#### Starter Collection

- New users automatically get a curated collection of cyberpunk classics
- Existing users can add the starter collection using the "Get Starter Collection" button
- Starter entries are marked with a "Starter" badge and globe icon
- You can edit or delete starter entries just like your own

## Deployment

### Frontend (Vercel)

\`\`\`bash
npm run build

# Deploy to Vercel via GitHub integration or CLI

\`\`\`

### Database Options

- **Neon**: Recommended for PostgreSQL (free tier available)
- **Supabase**: Alternative PostgreSQL option
- **Railway**: Deploy with Railway PostgreSQL
- **Render**: Deploy with Render PostgreSQL
- **AWS**: Deploy with RDS PostgreSQL

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

### Planned Features

- [ ] Image upload for movie/show posters
- [ ] Advanced search with multiple filters
- [ ] Export data to CSV/JSON
- [ ] Watchlist and favorites categories
- [ ] Social features (sharing, reviews)
- [ ] Bulk operations (delete multiple)
- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Two-factor authentication (2FA)

### Technical Improvements

- [ ] Real-time updates with WebSockets
- [ ] Caching with Redis
- [ ] Image optimization and CDN
- [ ] Progressive Web App (PWA)
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] Mobile app (React Native)

### Completed Features

- [x] ~~User authentication (login/signup/logout)~~
- [x] ~~OAuth providers (Google, GitHub)~~
- [x] ~~User-specific collections~~
- [x] ~~Real database integration~~
- [x] ~~Global starter collection system~~
- [x] ~~Landing page for unauthenticated users~~
- [x] ~~Dark/light theme toggle~~
- [x] ~~Cyberpunk theme with animations~~

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

---

**Built with ❤️ and ⚡ for the cyberpunk future**
