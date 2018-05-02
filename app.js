var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , port = 8080
  , serveIndex = require('serve-index')
  , MongoClient = require('mongodb').MongoClient

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

//app.use('/lbar/', express.static(__dirname + '/public'))
//app.use('/lbar/administration/', express.static(__dirname + '/public'))

//app.use('/', express.static(__dirname + '/public'))

app.use(morgan('dev'));
app.all('/*', express.static(__dirname + '/public'))
app.use('/', require('./controllers'))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var db

app.all("/*", function(req, res, next){
    console.log('\n DIRECTORY : ' + __dirname)
    next()
})

//lancement mongodb
//MongoClient.connect('mongodb://Y7nn:Gr1me8ergen!@127.0.0.1:27017/lbar', function (err, client) {
MongoClient.connect('mongodb://127.0.0.1:27017/lbar', function (err, client) {
    if (err) return console.log('ERREUR DE CO : ' + err)
    db = client.db('lbar')

})

app.listen(port, function() {
console.log('Listening on port ' + port)
})
