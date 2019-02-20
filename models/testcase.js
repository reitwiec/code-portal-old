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
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
        allowNull: false
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
