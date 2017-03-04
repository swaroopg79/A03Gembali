var path = require("path");
var http=require('http');
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();  // make express app
var server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/views/')));

app.use(express.static('assets'))

// view engine
app.set('view engine','ejs');


// GETS
app.get("/", function(req,res){
	res.render("welcome");
});

app.get('/index', function(req,res){
	res.render("index");
});


app.get('/calculate', function(req,res){
  res.render('calculate');
});



app.get("/contact", function(req,res){
	res.render("contact");
});
app.get("/welcome", function(req,res){
	res.render("welcome");
});



app.post("/contact",function(req,res){
    var refname=req.body.uName;
    var refmsg=req.body.message;
    console.log("i am here");
var api_key = 'key-b3a53026545aab039df239a33898de75';
var domain = 'sandbox2a56da8f0da44435aacf5667e1df6353.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'A03 Web Test <postmaster@sandbox2a56da8f0da44435aacf5667e1df6353.mailgun.org>',
  to: 'swaroopg790@gmail.com',
  subject: refname,
  text: refmsg
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
if(!error)
{
      //res.send("Mail Sent");
res.render("contact");
      
}
    else
      res.send("Mail not sent <br/>Error Message : "+error);


});
});
  

app.get("/gbindex", function(req,res){
	res.render("gbindex");
});

var entries = [];
app.locals.entries = entries; // now entries can be accessed in .ejs files

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("gbindex");  // where to go next? Let's go to the home page :)
});
// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404");
});



server.listen(8081, function () {
  console.log('Nodejs app listening on http://127.0.0.1:8081/');
});