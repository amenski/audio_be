const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan');

mongoose.connect("mongodb://localhost/audio_books", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(err => console.error("Connection error", err));


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// File upload SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads'); //TODO add category like uploads/{filksius}/chap1.mp3, OR uploads/{filksisu}-chap1.mp3
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + '-' + Date.now())
//   }
// });
var storage = multer.memoryStorage();
var upload = multer({ storage: storage })

module.exports = {
  connection: db,
  fileUpload: upload,
  morgan: morgan
};