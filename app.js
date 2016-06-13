var express = require('express');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('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');


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.render('index');
});

app.post('/send', function(req, res){

  console.log(req.body);
  sendgrid.send({
      to:       'gukiece@gmail.com',
      from:     req.body.email,
      subject:  'Message received from :'+req.body.name,
      text:     req.body.message
      }, function(err, json) {
      });
res.redirect('/');
});


var port = process.env.PORT || 3002;
app.listen(port);
console.log('server started ...');
