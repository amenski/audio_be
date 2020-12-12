const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require('body-parser');

const config = require("./src/config");
const routes = require('./src/routes');


//read post body
app.use(config.logger('custom', { stream: config.accessLogStream }));
app.use(config.apiRateLimiter);
// check if valid UUID is recieved and set it to response.
// Validation: the timestamp should only be of today
app.use(config.responseEnhance);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



//register all routes
routes(app);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));