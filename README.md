# battle-recorder
Simple CRUD application to record wargaming battles and their results. \
It's a hobby project to try building a web server with Express.js and to learn node.js

## Application overview
End goal of this project is to create functioning web service which allows users to store, update and delete their battle results, as well as see some basic statistics in relation to their scores. 
\
I have some ideas how to expand this app, like score and battle sharing, basic army list creator and marking armies as favourites, \
but right now i am focusing on basic features mentioned above

## Techonlogies
Application is written in Express.js with Sequelize for handling db operations. Database itself is sqlite3 and \
user authorization will be handled using JWT
