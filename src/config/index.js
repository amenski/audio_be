const Sequelize = require("sequelize");
const config = {
    username: 'postgres',
    password: 'postgres',
    database: 'audio_books',
    server: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}

const sequelize = new Sequelize(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = require('../models/post.model')(sequelize, Sequelize);

module.exports = db;