CREATE TABLE users (
    username TEXT PRIMARY KEY, 
    password TEXT
);

CREATE TABLE configOptions (
    namespace TEXT, 
    label TEXT
);

INSERT INTO users (username, password) VALUES ('admin', 'admin');
INSERT INTO configOptions (namespace, label) VALUES ('default', 'app=kea');