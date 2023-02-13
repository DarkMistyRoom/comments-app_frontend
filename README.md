# Comments App

Users can add comments and comments to comments(replies). All data stored in the database(Postgres)
There is a possibility to sort main comments by user name, use email, and created dates in both directions.
There are 25 comments by default. You can change this count with the variable in the constants.ts file.
Also, users have a possibility to upload the file, but this feature is still in development and not complete.
Implemented security from XSS attacks and SQL injections

Tech stack: PostgreSQL, Sequelize, ExpressJS, React, Typescript

To run the project click the demo link
[Demo link](https://darkmistyroom.github.io/comments-app_frontend/)

[Server code](https://github.com/DarkMistyRoom/comments_back)
