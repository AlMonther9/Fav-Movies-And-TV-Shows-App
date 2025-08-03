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

### Backend
- **Next.js API Routes** (RESTful endpoints)
- **MySQL** database (schema provided)
- **Prisma ORM** (configuration included)
- **Zod** for schema validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd favorite-movies-tv-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up the database**
   \`\`\`bash
   # Create MySQL database
   mysql -u root -p < scripts/database-schema.sql
   
   # Seed with sample data (optional)
   mysql -u root -p < scripts/seed-data.sql
   \`\`\`

4. **Configure environment variables**
   Create a `.env.local` file:
   \`\`\`env
   DATABASE_URL="mysql://username:password@localhost:3306/favorite_media"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`

5. **Run database migrations** (if using Prisma)
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

6. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### media_entries table
- `id` - Primary key (auto-increment)
- `title` - Movie/TV show title (required)
- `type` - ENUM('Movie', 'TV Show') (required)
- `director` - Director name (required)
- `budget` - Production budget
- `location` - Filming location
- `duration` - Runtime/episode length
- `year` - Release year or date range
- `genre` - Genre classification
- `description` - Plot summary
- `rating` - User rating (1-5 stars)
- `poster_url` - Image URL (for future enhancement)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## API Endpoints

### GET /api/media
Fetch media entries with pagination and filtering
- Query params: `page`, `limit`, `search`, `type`
- Returns: `{ entries, totalCount, hasMore, page, limit }`

### POST /api/media
Create a new media entry
- Body: Media entry object
- Returns: Created entry with ID

### PUT /api/media/[id]
Update an existing media entry
- Body: Updated media entry object
- Returns: Updated entry

### DELETE /api/media/[id]
Delete a media entry
- Returns: Success message

## Project Structure

\`\`\`
├── app/
│   ├── api/media/          # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main application
├── components/ui/          # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
├── scripts/
│   ├── database-schema.sql # Database setup
│   └── seed-data.sql      # Sample data
├── package.json
├── tailwind.config.ts
└── README.md
\`\`\`

## Usage

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
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
\`\`\`

## Future Enhancements

### Planned Features
- [ ] User authentication (login/signup/logout)
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
