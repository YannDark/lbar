var express = require('express')
    , app = express()
    ,  mailer = require('express-mailer') //envoi de mail
    , router = express.Router()
    , exphbs  = require('express-handlebars') //template html
    , PropertiesReader = require('properties-reader') //lecture fichier prop
    , properties = PropertiesReader('other/lbar.properties');


    // pour l'envoi de mail
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    mailer.extend(app, {
      from: 'no-reply@boitearideaux.com',
      host: 'smtp.gmail.com', // hostname
      secureConnection: true, // use SSL
      port: 465, // port for secure SMTP
      transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
      auth: {
        user: properties.get('gmail.account'),
        pass: properties.get('gmail.password')
      }
    });

router.get('/', function(req, res) {
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
            //res.redirect("/administration/");
            res.redirect('administration/realisation/add');
        } else {
            console.log("Connexion échouée");
            res.redirect("/connexion");
        }
    });
})

//affichage de la galerie
.get('/galerie', function(req, res) {
    res.render('galerie', {
        titre : 'La boîte à rideaux, galerie des réalisations'
  });
})

//affichage de la galerie
.get('/apropos', function(req, res) {
    res.render('apropos', {
        titre : 'La boîte à rideaux, à propos'
  });
})

.get('/contact', function(req, res) {
    res.render('contact', {
        titre : 'Contactez-nous'
    });
})
.post('/contact', function(req, res) {
    app.mailer.send('mail/mail', {
        to: 'boite.a.rideaux@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
        subject: 'Prise de contact', // REQUIRED.
        otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
    }, function (err) {
        if (err) {
          // handle error
          console.log(err);
          res.send('There was an error sending the email');
          return;
        }
        res.render('contact', {
            titre : 'Contactez-nous'
        });
    });
})


.get('/test', function(req, res) {
    res.render('test', {
        titre : 'Test du slip'
    });
})

module.exports = router
