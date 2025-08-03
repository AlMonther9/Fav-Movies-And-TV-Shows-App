-- Create database
CREATE DATABASE IF NOT EXISTS favorite_media;
USE favorite_media;

-- Create users table (for future authentication)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create media_entries table
CREATE TABLE media_entries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    type ENUM('Movie', 'TV Show') NOT NULL,
    director VARCHAR(255) NOT NULL,
    budget VARCHAR(100),
    location VARCHAR(255),
    duration VARCHAR(100),
    year VARCHAR(50),
    genre VARCHAR(100),
    description TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    poster_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_title (title),
    INDEX idx_created_at (created_at)
);

-- Create indexes for better performance
CREATE INDEX idx_media_search ON media_entries(title, director, genre);
CREATE INDEX idx_media_filter ON media_entries(type, rating);
