module.exports = (sequelize, Datatypes) => {
    let Testcases = sequelize.define('testcases', {
        id: {
            type = Datatypes.BIGINT,
            primaryKey = true,
            autoIncrement = true
        },
        question: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        sample {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        weight: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        input_path: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        output_path: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    });
    return Testcases;
};