-- Create global movie collection that will be seeded to new users
-- These entries will be copied to each new user's collection

-- First, create a user for global entries (optional, for organization)
-- You can skip this and use any existing user ID

-- Global Movies Collection
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
  rating,
  "isGlobal"
) VALUES 
-- Cyberpunk/Sci-Fi Collection
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Blade Runner 2049',
  'Movie',
  'Denis Villeneuve',
  '$150M',
  'Budapest, Hungary',
  '164 min',
  '2017',
  'Sci-Fi',
  'A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'The Matrix',
  'Movie',
  'The Wachowskis',
  '$63M',
  'Sydney, Australia',
  '136 min',
  '1999',
  'Sci-Fi',
  'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Ghost in the Shell',
  'Movie',
  'Mamoru Oshii',
  '$10M',
  'Tokyo, Japan',
  '83 min',
  '1995',
  'Anime',
  'A cyborg policewoman hunts a powerful hacker known as the Puppet Master.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Akira',
  'Movie',
  'Katsuhiro Otomo',
  '$10M',
  'Tokyo, Japan',
  '124 min',
  '1988',
  'Anime',
  'A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Cyberpunk: Edgerunners',
  'TV_Show',
  'Hiroyuki Imaishi',
  '$3M/ep',
  'Tokyo, Japan',
  '25 min/ep',
  '2022',
  'Anime',
  'A street kid tries to survive in a technology and body modification-obsessed city of the future.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Black Mirror',
  'TV_Show',
  'Charlie Brooker',
  '$2M/ep',
  'London, UK',
  '60 min/ep',
  '2011-2019',
  'Sci-Fi',
  'An anthology series exploring a twisted, high-tech multiverse where humanity greatest innovations collide.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Altered Carbon',
  'TV_Show',
  'Laeta Kalogridis',
  '$7M/ep',
  'Vancouver, Canada',
  '60 min/ep',
  '2018-2020',
  'Sci-Fi',
  'In a future where consciousness can be transferred to different bodies, a former soldier investigates a murder.',
  4,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Mr. Robot',
  'TV_Show',
  'Sam Esmail',
  '$3M/ep',
  'New York, USA',
  '45 min/ep',
  '2015-2019',
  'Drama',
  'A cybersecurity engineer by day and vigilante hacker by night becomes a key figure in a complex game of global dominance.',
  5,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Tron: Legacy',
  'Movie',
  'Joseph Kosinski',
  '$170M',
  'Vancouver, Canada',
  '125 min',
  '2010',
  'Sci-Fi',
  'The son of a virtual world designer goes looking for his father and ends up inside the digital world.',
  4,
  true
),
(
  'cmdvrvw5q0000qfxck1l0fkpv',
  'Ex Machina',
  'Movie',
  'Alex Garland',
  '$15M',
  'London, UK',
  '108 min',
  '2014',
  'Sci-Fi',
  'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence.',
  5,
  true
);
