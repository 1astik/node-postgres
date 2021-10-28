Link on deploy server(Heroku):
=====
https://pacific-caverns-50211.herokuapp.com


Env development, auto-reloading:
===
    npm run dev

Env production:
===
    npm run start


Env:
=

COMMON:
-

| name                              | type    | default                  |
|-----------------------------------|---------|--------------------------|
| DB_USER                           | string  | postgres
| DB_PASS                           | string  | root
| DB_HOST                           | string  | localhost
| DB_PORT                           | integer | 5432
| DB_NAME                           | string  | my_db
| JWT_SECRET                        | string  | password
| JWT_EXPIRE                        | integer | 1800
| HTTP_PORT                         | integer | 8090    

Command for start Docker:
===
"docker-compose up"