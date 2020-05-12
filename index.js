const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const db = require("./src/config");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});


//read post body
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const postRoutes = require('./src/routes/post_route')(app);

//middleware for log
app.use(function(req, res, next) {
    console.log(req.body);
    next();
});


//register routes
app.use('/api', postRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));