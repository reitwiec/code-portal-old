module.exports = (sequelize, DataTypes) => {
  let SubTestCase = sequelize.define(
    'subtestcase',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      verdict: {
        type: DataTypes.ENUM,
        values: ['AC', 'WA', 'TLE', 'CE', 'RE', 'PROC'],
        allowNull: false
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
      tableName: 'sub_test_case'
    }
  );

  SubTestCase.associate = models => {
    models.subtestcase.belongsTo(models.submission, {
      as: 'submission',
      foreignKey: { allowNull: false }
    });
  };

  return SubTestCase;
};
