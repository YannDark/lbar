var express = require('express')
  , multer = require('multer')
  , app = express()
  , router = express.Router()
  , session = require('express-session');


const upload = multer({dest : 'public/img/rideaux'});



// Define routes handling profile requests
router.get('/', function(req, res) {
  res.render('admin/index', {titre : 'Accueil admin'})
})
.get('/realisation/add', function(req, res) {
  res.render('admin/realisation/addRealisation', {titre : 'Ajouter une réalisation'})
})
.post('/realisation/add', upload.single('nomFichier'), function(req, res) {
  console.log('Fichiers : ' + console.log(JSON.stringify(req.file)))

    res.render('admin/realisation/addRealisation', {titre : 'Réalisation ajoutée!'})
})


module.exports = router;
