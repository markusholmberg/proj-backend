CREATE TABLE IF NOT EXISTS users (
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(60),
    year INT(4),
    month VARCHAR(20),
    day INT(2),
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS reports (
    week INT NOT NULL,
    report TEXT NOT NULL,
    UNIQUE(week)
);
