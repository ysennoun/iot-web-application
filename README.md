 # Web server for Connected Bar
 
 Fist you need to install node js on your machine.
 
 ## Stack
 
 We use : 
 
 - node js to create a web server that request a cloud (e.g : Azure)
 - jQuery 3, bootstrap 4 to generate web pages
 
 utilisation de boostratp 4, jquery 3 pour les pages web
 
 
 ### node js
 
 We installed the following modules for node js : 
 
 - express
 - ejs
 - body-parser
 
 
 ## Web pages
 
 There are two pages : 
 
 - Page commands that shows all on-going commands. It is possible to indicate to waitress the command is ready.
 - Page statistics that shows some statistics to server commands (for instance how long does it take to serve a drink ?)
 
 ## Run server
 
 Execute the following commands on a terminal to run the node js server : 
 
    npm install 
    npm start 


npm start server.js