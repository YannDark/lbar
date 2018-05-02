//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var RealisationSchema = new Schema({
    id: Schema.Types.ObjectId,
    legende: String,
    datePublication: Date,
    type: String,
    nomFichier: String
});

// Compile model from schema
var Realisation = mongoose.model('realisation', RealisationSchema );

// Create new comment in your database and return its id
exports.create = function(param) {
  // Create an instance of model SomeModel
  var real = new realisation(param);

  // Save the new model instance, passing a callback
  real.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
}

// Get a particular comment
exports.get = function(id, cb) {
  cb(null, {id:id, text: 'Very nice example'})
}

// Get all comments
exports.all = function(cb) {
  cb(null, [])
}

// Get all comments by a particular user
exports.allByUser = function(user, cb) {
  cb(null, [])
}
