const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require('body-parser');

const config = require("./src/config");
const routes = require('./src/routes');


//read post body
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(config.morgan('dev'));


//register all routes
routes(app);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));