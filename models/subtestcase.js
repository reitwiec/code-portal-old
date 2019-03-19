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
      }
    },
    {
      underscored: true,
      tableName: 'sub_test_cases'
    }
  );

  SubTestCase.associate = models => {
    models.subtestcase.belongsTo(models.submission, {
      as: 'submission',
      foreignKey: { name: 'submission_id', allowNull: false }
    });
    models.subtestcase.belongsTo(models.testcase, {
      as: 'testcase',
      foreignKey: { name: 'testcase_id', allowNull: false }
    });
  };

  return SubTestCase;
};
