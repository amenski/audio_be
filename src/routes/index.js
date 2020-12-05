const postRoutes = require('./post_routes');
const categoryRoutes = require('./category_routes');
const versionRoutes = require('./version.sync.routes');

const routes = app => {
    app.use('/api/post', postRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/version', versionRoutes);
};

module.exports = routes;