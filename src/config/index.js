const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const uuidTime = require('uuid-time');
const mongoose = require('mongoose');
const morganBody = require('morgan-body');
const rfs = require('rotating-file-stream'); 
const rateLimit = require("express-rate-limit");

mongoose.connect("mongodb://localhost/audio_books", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(err => console.error("Connection error: ", err));


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

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

//morgan custom token config
// transaction-id is UUID from client
// TODO add req and res body to the log
// morgan.token("custom", ":date[iso] | 0.0.1 | :req[transaction-id] | :url | :method | :status");

// Rate limiting for all requests, in memory store:  for 12hr
const apiRateLimiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12hr
  max: 10 // 5 max calls a day
});

// Enhance response with UUID recieved (if valid)
const responseEnhance = (req, resp, next) => {
  let tx = req.headers['transaction-id'];
  
  let validV1 = uuid.validate(tx) && uuid.version(tx) === 1;
  if(!validV1) {
    const data = {
      "message": "Invalid transaction id found."
    }
    return resp.status(400).json(data);
  } else {
    // TODO validate the Date is today
  }
  resp.setHeader("transaction-id", uuidTime.v1(tx));
  next();
}

module.exports = {
  fileUpload: upload,
  logger: morganBody,
  mongoose: mongoose,
  responseEnhance: responseEnhance,
  accessLogStream: accessLogStream,
  apiRateLimiter: apiRateLimiter
};