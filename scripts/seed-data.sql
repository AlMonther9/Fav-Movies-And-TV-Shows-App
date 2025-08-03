-- Sample data for testing (optional)
-- This will only work after you have users in your database

-- First, you need to get a user ID from your users table
-- Replace 'your-user-id-here' with an actual user ID from your database

INSERT INTO "MediaEntry" (
  "userId", 
  title, 
  type, 
  director, 
  budget, 
  location, 
  duration, 
  year, 
  genre, 
  description, 
  rating
) VALUES 
(
  'your-user-id-here',
  'Blade Runner 2049',
  'Movie',
  'Denis Villeneuve',
  '$150M',
  'Budapest, Hungary',
  '164 min',
  '2017',
  'Sci-Fi',
  'A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard.',
  5
),
(
  'your-user-id-here',
  'Cyberpunk: Edgerunners',
  'TV_Show',
  'Hiroyuki Imaishi',
  '$3M/ep',
  'Tokyo, Japan',
  '25 min/ep',
  '2022',
  'Anime',
  'A street kid tries to survive in a technology and body modification-obsessed city of the future.',
  5
),
(
  'your-user-id-here',
  'The Matrix',
  'Movie',
  'The Wachowskis',
  '$63M',
  'Sydney, Australia',
  '136 min',
  '1999',
  'Sci-Fi',
  'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
  5
);
