const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/audio_books", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(err => console.error("Connection error", err));


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = {
  connection: db
};