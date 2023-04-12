-- Active: 1674131499137@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT, 
    comments INTEGER DEFAULT(0) NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL, 
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE comments_posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    post_id TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL, 
    comment_id TEXT NOT NULL, 
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY (comment_id) REFERENCES comments_posts(id));

INSERT INTO users(id, name, email, password, role)
VALUES
    ("u001", "Arthur", "arthur@gmail.com", "arthur123", "ADMIN" ),
    ("u002", "Brenda", "brenda@gmail.com", "brenda456", "NORMAL");