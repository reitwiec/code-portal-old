module.exports = (sequelize, DataTypes) => {
  let Testcase = sequelize.define(
    'testcase',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sample: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      explanation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      input_path: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      output_path: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    },
    {
      underscored: true,
      tableName: 'test_cases'
    }
  );

  Testcase.associate = models => {
    models.testcase.belongsTo(models.question, {
      as: 'question',
      foreignKey: { allowNull: false }
    });
  };

  return Testcase;
};
