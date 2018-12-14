module.exports = (sequelize, Datatypes) => {
    let Moderator = sequelize.define('moderator', {
        user: {
            type: Datatypes.INTEGER,
            unique: false,
            allowNull: false
        },
        question: {
            type: Datatypes.INTEGER,
            unique: false,
            allowNull: false
        }
    });
    return Moderator;
};