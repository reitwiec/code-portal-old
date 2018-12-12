module.exports = (sequelize, Datatypes) => {
    let Contest = sequelize.define('contest', {
        id: {
            type = Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING(50),
            unique: true,
            allowNull: false
        },
        start: {
            type: Datatypes.DATE,
            allowNull: false
        },
        end: {
            type: Datatypes.DATE,
            allowNull: false
        },
        description: {
            type: Datatypes.TEXT,
            allowNull: true
        },
        visibility: {
            type: Datatypes.BOOLEAN,
            allowNull: false
        },
        slug: {
            type: Datatypes.STRING(10),
            allowNull: false
        }
    });
    return Contest;
};