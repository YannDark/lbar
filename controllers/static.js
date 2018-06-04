var express = require('express')
    , router = express.Router()

.get('/', function(req, res) {
  res.render('index', {titre : 'La boîte à rideaux, bienvenue'})
})

//connexion admin
.get('/connexion', function(req, res) {
  res.render('connexion', {titre : 'Connexion à l\'espace admin'})
})

//vérifie si on a le bon utilisateur + connexion admin
.post('/connect', function(req, res) {

    var userColl = req.db.get('userCollection');
    var users = userColl.find({name: req.body.name, password: req.body.password}, {}, function (e, docs) {

        if(docs.length == 1) {
            console.log("Connexion réussie");
            req.session.isConnected = true;
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

//affichage de la galerie
.get('/galerie', function(req, res) {
    res.render('galerie', {
        titre : 'La boîte à rideaux, galerie des réalisations',
        users : docs
  });

})

module.exports = router
