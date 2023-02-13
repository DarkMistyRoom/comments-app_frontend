# Comments App

Users can add comments and comments to comments(replies). All data stored in the database(Postgres)
There is a possibility to sort main comments by user name, use email, and created dates in both directions.
There are 25 comments by default. You can change this count with the variable in the constants.ts file.
Also, users have a possibility to upload the file, but this feature is still in development and not complete.
Implemented security from XSS attacks and SQL injections

Tech stack: PostgreSQL, Sequelize, ExpressJS, React, Typescript
 
[Demo link](https://darkmistyroom.github.io/comments-app_frontend/)

[Server code](https://github.com/DarkMistyRoom/comments_back)

To run the backend locally:
- clone the backend project repo(Server code) `git clone`
- run `npm i`
- run `npm start`
The server will connect to the deployed database(Neon) by default. 
Or you can use the local database and connect to it by specifying a link in the src/utils/db.ts

To run the frontend locally:
- clone this repo `git clone`
- run `npm i`
- run `npm start`
