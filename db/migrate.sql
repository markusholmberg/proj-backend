CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(60),
    balance INT,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS userItems (
    username VARCHAR(50),
    sulfuras INT,
    thunderfury INT,
    tabard INT,
    feldrake INT,
    rooster INT,
    tiger INT,
    rocket INT
);

INSERT INTO users (username, password, email)
VALUES("Pelle", "pellepelle", "pelle@pelle.se");

INSERT INTO userItems (username, sulfuras, thunderfury, tabard, feldrake, rooster, tiger, rocket)
VALUES("Pelle", 4, 3, 5, 12, 8, 1, 20);
