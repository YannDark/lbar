var express = require('express')
  , router = express.Router()

.get('/', function(req, res) {
  res.render('index', {titre : 'La boîte à rideaux, bienvenue'})
})

//connexion admin
.get('/connexion', function(req, res) {
  res.render('connexion', {titre : 'Connexion à l\'espace admin'})
})

//vérifie si on a le bon utilisateur
.post('/connect', function(req, res) {
  var userColl = req.db.get('userCollection');

  var users = userColl.find({name: req.name, password: req.password}, {}, function (e, docs) {
      if(docs.length == 1) {
        console.log("Connexion réussie");
        res.render('galerie', {
            titre : 'La boîte à rideaux, galerie des réalisations',
            users : docs
        })
      } else {
        console.log("Connexion échouée");
        res.redirect("/connexion");
      }
  });
})

// Define routes handling profile requests
.get('/galerie', function(req, res) {
    res.render('galerie', {
        titre : 'La boîte à rideaux, galerie des réalisations',
        users : docs
  });

})

module.exports = router
