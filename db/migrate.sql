CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(60),
    balance INT,
    UNIQUE(email)
);
