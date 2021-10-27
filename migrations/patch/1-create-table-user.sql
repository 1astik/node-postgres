create TABLE "user"
(
    uid      uuid DEFAULT uuid_generate_v4(),
    email    VARCHAR(100),
    password VARCHAR(100),
    nickname VARCHAR(30),
    PRIMARY KEY (uid),
    UNIQUE (email),
    UNIQUE (nickname)
);
