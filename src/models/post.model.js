
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        id: {
            type: Sequelize.Number,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        thumbUrl: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        categoryId: {
            type: Sequelize.Number,
            allowNull: false
        }
    });

    return Post;
}