CREATE DATABASE IF NOT EXISTS assignment3_app6;
USE assignment3_app6;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO products (title, image, price, description) VALUES
('Noise Cancelling Earbuds', 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc', 79.99, 'Lightweight earbuds with strong bass, low latency and all-day battery life.');
