create TABLE "tag"
(
    id        SERIAL,
    creator   uuid,
    name      VARCHAR(40) UNIQUE,
    sortOrder INT DEFAULT (0),
    FOREIGN KEY (creator) REFERENCES "user" (uid)
);