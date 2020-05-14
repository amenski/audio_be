const postRoutes = require('./post_routes');
const categoryRoutes = require('./category_routes');

const routes = app => {
    app.use('/api/post', postRoutes);
    app.use('/api/category', categoryRoutes);
};

module.exports = routes;