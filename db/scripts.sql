-- users table for authentication
CREATE TABLE users (
    username TEXT PRIMARY KEY, 
    password TEXT
);

-- configOptions table for storing configuration options 
CREATE TABLE configOptions (
    namespace TEXT, 
    label TEXT
);

-- insert default user and config options
INSERT INTO users (username, password) VALUES ('admin', 'admin');
INSERT INTO configOptions (namespace, label) VALUES ('default', 'app=kea');