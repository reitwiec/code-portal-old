module.exports = (sequelize, Datatypes) => {
    let Moderator = sequelize.define('moderator', {
        user: {
            type: Datatypes.INTEGER,
            unique: false,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        question: {
            type: Datatypes.BIGINT,
            unique: false,
            allowNull: false,
            references: {
                model: "questions",
                key: "id"
            }
        }
    });
    return Moderator;
};