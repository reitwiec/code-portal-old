module.exports = (sequelize, Datatypes) => {
    let Testcase = sequelize.define('testcase', {
        id: {
            type: Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Datatypes.BIGINT,
            allowNull: false,
            references: {
                model: "questions",
                key: "id"
            }
        },
        sample: {
            type: Datatypes.STRING.BINARY,
            allowNull: false
        },
        explanation: {
            type: Datatypes.STRING(150),
            allowNull: true 
        },
        weight: {
            type: Datatypes.DOUBLE,
            allowNull: false
        },
        input_path: {
            type: Datatypes.STRING(100),
            allowNull: true
        },
        output_path: {
            type: Datatypes.STRING(100),
            allowNull: true
        }
    });
    return Testcase;
};