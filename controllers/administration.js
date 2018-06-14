var express = require('express')
  , multer = require('multer')
  , app = express()
  , router = express.Router()
  , jsDatepicker = require("js-datepicker")
  , fs = require('fs');

const upload = multer({dest : 'public/img/'});


// Accueil admin
router.get('/', function(req, res) {
    res.render('admin/index', {titre : 'Accueil admin'})
})
.get('/realisation/add', function(req, res) {
    res.render('admin/realisation/addRealisation', {titre : 'Ajouter une réalisation'})
})

//Ajout d'un nouvel élément pour la galerie
.post('/realisation/add', upload.single('nomFichier'), function(req, res) {
    var legende = req.body.legende,
        type = req.body.type,
        date = new Date()

    //déplacement du fichier + enregistrement en bdd
    if (req.file) {
        fs.rename(('public/img/' + req.file.filename), 'public/img/' + type + "/" + req.file.filename, (err) => {
            if (err) throw err;
            console.log('Déplacement effectué de l\'image!');

            //si tout s'est bien passé on fait l'enregistrement en bdd
            if (req.db) {
                var collection = req.db.get("galerieCollection");
                if (collection) {
                    collection.insert({legende: legende, type: type, date: date, filename: req.file.filename}, function(error, doc) {
                        if (error) {
                            console.error("Erreur sur l'insertion dans la collection galerieCollection");
                        }
                    })
                } else {
                    console.error("impossible de récupérer req.db.getCollection('galerieCollection')");
                }
            } else {
                console.error("req.db is null");
            }
        });

    } else {
        console.log("req.files n'existe pas");
    }

    res.render('admin/realisation/addRealisation', {titre : 'Réalisation ajoutée!', picAdded : true})
})
//deconnexion
.get('/deconnexion', function(req, res) {
    console.log("entrée dans la méthode de déco");
    req.session.destroy();
    res.redirect("..");
})




module.exports = router;
