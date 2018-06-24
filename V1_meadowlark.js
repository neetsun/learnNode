//using express3-handlebars instead of jade

var express = require('express');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

var app = express();
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000); //set an environment value 'port' before starting server

//both request and response objects are passed to the function
//instead of using res.end, uses res.send
//Home page
app.get('/',function(req,res){
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

//About page; works for /About, /about?foo=bar, /about/?foo=bar
app.get('/about',function(req,res){
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});

//For app.use, function is executed every time app receives request
//it is a catch all handler, if anything cannot be matched by route
//custom 404 page
app.use(function(req,res,next){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; Press ctrl + c to terminate');
});