module.exports = (sequelize, Datatypes) => {
    let Moderator = sequelize.define('moderator', {
        user: {
            type: Datatypes.INTEGER,
            unique: false,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        question: {
            type: Datatypes.INTEGER,
            unique: false,
            allowNull: false,
            references: {
                model: "question",
                key: "id"
            }
        }
    });
    return Moderator;
};