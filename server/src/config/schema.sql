-- ============================================
--  Bulbul Restaurant — MySQL Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS bulbul_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bulbul_db;

-- Users (admin + customers)
CREATE TABLE IF NOT EXISTS users (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  role         ENUM('user','admin') DEFAULT 'user',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  description  TEXT,
  price        DECIMAL(10,2) NOT NULL,
  category     VARCHAR(80) NOT NULL,   -- e.g. starters, mains, desserts, drinks
  image_url    VARCHAR(255),
  is_available TINYINT(1) DEFAULT 1,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  email            VARCHAR(150) NOT NULL,
  phone            VARCHAR(20),
  date             DATE NOT NULL,
  time             TIME NOT NULL,
  guests           INT NOT NULL DEFAULT 1,
  special_requests TEXT,
  status           ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  phone      VARCHAR(20),
  subject    VARCHAR(200) NOT NULL,
  message    TEXT NOT NULL,
  is_read    TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  image_url  VARCHAR(255) NOT NULL,
  caption    VARCHAR(200),
  category   VARCHAR(80),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  role       VARCHAR(100),
  message    TEXT NOT NULL,
  rating     TINYINT DEFAULT 5,
  avatar_url VARCHAR(255),
  is_active  TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
