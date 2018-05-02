var express = require('express')
  , router = express.Router()

.get('/', function(req, res) {
  res.render('index', {titre : 'La boîte à rideaux, bienvenue'})
})

// Define routes handling profile requests
.get('/galerie', function(req, res) {
  res.render('galerie', {titre : 'La boîte à rideaux, galerie des réalisations'})
})

module.exports = router
