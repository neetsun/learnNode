//using express3-handlebars instead of jade

var express = require('express');
var app = express();

//handlebars
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000); //set an environment value 'port' before starting server

//create static middleware; create route for each static file which render file and display to client
//hence at main.handlebars, i no need to include "/public"
app.use(express.static(__dirname + '/public'));

var fortuneCookies=[
    "Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];



//view engine return content type of text/html and status of 200 by default
app.get('/',function(req,res){
    res.render('home');
});

app.get('/about',function(req,res){
    var randomFortune = fortuneCookies[Math.floor(Math.random()*fortuneCookies.length)];
    res.render('about',{fortune: randomFortune});
});

//custom 404 page
app.use(function(req,res,next){
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; Press ctrl + c to terminate');
});