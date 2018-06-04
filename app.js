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

//app.use('/lbar/', express.static(__dirname + '/public'))
//app.use('/lbar/administration/', express.static(__dirname + '/public'))

//app.use('/', express.static(__dirname + '/public'))
app.use(session({secret: 'ssshhhhh'}));

//test pour savoir si on connecté en accédant à l'espace admin
app.all("/administration/*", function(req, res) {
  console.log("entrée de app.all de l'admin");
  if (!req.session.isConnected) {
    console.log("Non connecté --> redirection vers l'accueil");
    res.redirect("/");
  }
})

app.use(morgan('dev'))
//app.use(session({secret : "ssssh"}));
app.all('/*', express.static(__dirname + '/public'))


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', require('./controllers'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.all("/*", function(req, res, next){
    console.log('\n DIRECTORY : ' + __dirname)
    next()
})

//lancement mongodb
//MongoClient.connect('mongodb://Y7nn:Gr1me8ergen!@127.0.0.1:27017/lbar', function (err, client) {
/*mongoClient.connect('mongodb://127.0.0.1:27017/lbar', function (err, client) {
    if (err) return console.log('ERREUR DE CO : ' + err)
    db = client.db('lbar')

})*/

app.listen(port, function() {
console.log('Listening on port ' + port)
})
