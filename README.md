 utilisation de boostratp 4, jquery 3 pour les pages web
 
 nodejs
 
 npm init
 npm install express
 npm install ejs
 npm install body-parser
 
 mkdir views
 mv commands.html views/commands.ejs
 mv statistics.html views/statistics.ejs
 
 mkdir public
 mv connected-bar-style.css public/
 
 touch server.js
 
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/public')); //for css
    app.set('view engine', 'ejs'); //to use ejs files in views
    
    app.get('/commands', function(req, res) {
        res.render('commands.ejs');
    });
    app.get('/statistics', function(req, res) {
        res.render('statistics.ejs');
    });
    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
    });
    app.listen(8080);


npm start server.js