CREATE DATABASE IF NOT EXISTS dama2;

USE dama2;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    tokens FLOAT NOT NULL,
    points FLOAT NOT NULL DEFAULT 0,
    isadmin BOOLEAN NOT NULL
);

INSERT INTO users (email, password, tokens, isadmin) VALUES
('antoniomrg@gmail.com', 'password', 100.00, false),
('umbertomrg@gmail.com', 'password', 100.00, true);

CREATE TABLE games (
    game_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stato VARCHAR(255) NOT NULL,
    storico TEXT NOT NULL,
    difficulty INT NOT NULL
);
