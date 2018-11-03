var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var optionsGetCommands = {
  url: "https://connected-bar.azure-api.net/connected-bar-function-app/v1/GetCommand",
  json: true,
  headers: {
    'User-Agent': 'request',
    'Cache-Control': 'no-cache',
    'Ocp-Apim-Trace': 'True',
    'Ocp-Apim-Subscription-Key': '1076d354eb6d43d8af2dde24335c76ba'
  }
};
var optionsServeCommands = {
    url: "https://connected-bar.azure-api.net/connected-bar-function-app/v1/ServeCommand",
    json: true,
    method: "POST",
    headers: {
    'User-Agent': 'request',
    'Cache-Control': 'no-cache',
    'Ocp-Apim-Trace': 'True',
    'Ocp-Apim-Subscription-Key': '1076d354eb6d43d8af2dde24335c76ba'
    },
    qs: {
        idCommand : '__idCommand__',
        type: '__type__'
    }
};
app.get('/', function(req, res) {
    res.redirect('/commands');
});
app.get('/commands', function(req, res) {
    request(optionsGetCommands, function (error, response, body) {
          if(error == null && response!= null && response.statusCode == 200) {
            obj = JSON.parse(body);
            var commands = [];
            Object.keys(obj).forEach(function(value){
              var command = [ obj[value].id, obj[value].drink];
              commands.push(command);
            });
            res.render('commands.ejs', {data: commands});
          }else {
            res.status(500).send({error: 'Error after request Azure.'});
          }
        });
});
app.post('/commands', function(req, res) {
    var options = optionsServeCommands;
    options.qs.idCommand = req.body.id;
    options.qs.type = req.body.drink;
    request(options, function (error, response, body) {
          console.log(error);
          console.log(response && response.statusCode);
          console.log(body);
          if(error == null && response!= null && response.statusCode == 200) {
            res.status(200).send({success: 'Success after request Azure.'});
          }else {
            res.status(500).send({error: 'Error after request Azure.'});
          }
        });
});
app.get('/statistics', function(req, res) {
    res.render('statistics.ejs');
});
app.use(function(req, res, next){
    res.render('404.ejs');
});
app.listen(8080);
