module.exports = (sequelize, Datatypes) => {
    let Question = sequelize.define('question', {
        id: {
            type: Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING(50),
            unique: true,
            allowNull: false
        },
        body: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        input_format: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        constraints: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        output_format: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        author: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        level: {
            type: Datatypes.ENUM,
            values: ['easy', 'medium', 'hard'],
            allowNull: false
        },
        contest: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        score: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        checker_path: {
            type: Datatypes.STRING(100),
            defaultValue: null, 
            allowNull: false
        },
        checker_language: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        time_limit: {
            type: Datatypes.DOUBLE,
            allowNull: false
        },
        slug: {
            type: Datatypes.STRING(50),
            allowNull: false
        },
        editorial: {
            type: Datatypes.INTEGER(10),
            allowNull: true
        },
        is_practice: {
            type: Datatypes.STRING.BINARY,
            allowNull: false
        }
    });
    return Question;
};