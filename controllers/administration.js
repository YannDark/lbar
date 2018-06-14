var express = require('express')
  , multer = require('multer')
  , app = express()
  , router = express.Router()
  , jsDatepicker = require("js-datepicker")
  , fs = require('fs');

const upload = multer({dest : 'public/img/'});


// Define routes handling profile requests
router.get('/', function(req, res) {
    res.render('admin/index', {titre : 'Accueil admin'})
})
.get('/realisation/add', function(req, res) {
    res.render('admin/realisation/addRealisation', {titre : 'Ajouter une réalisation'})
})
.post('/realisation/add', upload.single('nomFichier'), function(req, res) {
    var legende = req.body.legende,
        type = req.body.type,
        date = req.body.datePublication

    //déplacement du fichier + enregistrement en bdd
    if (req.file) {
        fs.rename(('public/img/' + req.file.filename), 'public/img/' + type + "/" + req.file.filename, (err) => {
            if (err) throw err;
            console.log('Déplacement effectué de l\'image!');
        });
    } else {
        console.log("req.files n'existe pas");
    }

    console.log("légende : " + legende + " | type : " + type + " | date : " + date);
    res.render('admin/realisation/addRealisation', {titre : 'Réalisation ajoutée!'})
})
//deconnexion
.get('/deconnexion', function(req, res) {
    console.log("entrée dans la méthode de déco");
    req.session.destroy();
    res.redirect("..");
})




module.exports = router;
