module.exports = (sequelize, DataTypes) => {
  let Submission = sequelize.define(
    'submission',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      path: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      points: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      verdict: {
        type: DataTypes.ENUM,
        values: ['WRONG', 'PARTIAL', 'CORRECT', 'CE'],
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'submissions'
    }
  );

  Submission.associate = models => {
    models.submission.belongsTo(models.question, {
      as: 'question',
      foreignKey: { allowNull: false }
    });
    models.submission.belongsTo(models.language, {
      as: 'language',
      foreignKey: { allowNull: false }
    });
    models.submission.belongsTo(models.user, {
      as: 'user',
      foreignKey: { allowNull: false }
    });
    models.submission.belongsTo(models.contest, {
      as: 'contest',
      foreignKey: { allowNull: false }
    });
    models.submission.hasMany(models.subtestcase, {
      as: 'SubTestCases',
      foreignKey: { allowNull: false }
    });
  };

  return Submission;
};
