var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , port = 8080
  , serveIndex = require('serve-index')
  , mongoClient = require('mongodb')
  , monk = require('monk')
  , db = monk('localhost:27017/lbar')
  , exphbs  = require('express-handlebars')
  , session = require('express-session');

//app.set('views', __dirname + '/views')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//lancement de la session
app.use(session({secret: 'ssshhhhh'}));

//test pour savoir si on connecté en accédant à l'espace admin
app.all("/administration/*", function(req, res, next) {
    console.log("requete " + req.originalUrl);
    if (!req.session.isConnected) {
        console.log("Non connecté --> redirection vers l'accueil");
        res.redirect("/");
    } else {
        console.log("Changement de layout");
        //changement du layout
        req.app.locals.layout = 'adminMain';
        next()
    }
})

//pour toutes les pages statiques (non admin)
app.all("/", function(req, res, next){
    console.log("requete  au dessus : " + req.originalUrl);
    //changement du layout
    req.app.locals.layout = 'main';
    req.session.destroy();
    next()
})

app.use(morgan('dev'))
app.all('/*', express.static(__dirname + '/public'))


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', require('./controllers'))


app.listen(port, function() {
    console.log('Listening on port ' + port)
})
