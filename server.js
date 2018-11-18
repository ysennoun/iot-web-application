var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var optionsGetCommandsAWS = {
    url: "https://66smmhj2cb.execute-api.eu-west-1.amazonaws.com/Stage/command",
    json: true,
    method: "GET"
};
app.get('/', function(req, res) {
    res.redirect('/summary');
});
app.get('/summary', function(req, res) {
    request(optionsGetCommandsAWS, function (error, response, body) {
          if(error == null && response!= null && response.statusCode == 200) {
            var countAll = 0
            var countBeer = 0;
            var countFood = 0;
            if(body != null) {
                countAll = Object.keys(body).length;
                Object.keys(body).forEach(function(value){
                  if (body[value].beer != null) countBeer++;
                  if (body[value].food != null) countFood++;
                });
            }
            res.render('summary.ejs', {data: [countAll, countBeer, countFood]});
          }else {
            res.status(500).send({error: 'Error after request AWS.'});
          }
        });

});
app.use(function(req, res, next){
    res.render('404.ejs');
});
app.listen(8080);
