var express = require('express')
  , router = express.Router()

.get('/', function(req, res) {
  res.render('index', {titre : 'La boîte à rideaux, bienvenue'})
})

// Define routes handling profile requests
.get('/galerie', function(req, res) {
  var userColl = req.db.get('userCollection');


  var users = userColl.find({}, {}, function (e, docs) {
      res.render('galerie', {
          titre : 'La boîte à rideaux, galerie des réalisations',
          users : docs
      })
  });

})

module.exports = router
