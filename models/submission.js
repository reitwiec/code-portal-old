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
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
      },
      points: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        default: 0
      },
      verdict: {
        type: DataTypes.ENUM,
        values: ['WRONG', 'PARTIAL', 'CORRECT', 'CE', 'PROCESSING'],
        allowNull: false,
        default: 'PROCESSING'
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
      foreignKey: { name: 'question_id', allowNull: false }
    });
    models.submission.belongsTo(models.language, {
      as: 'language',
      foreignKey: { name: 'language_id', allowNull: false }
    });
    models.submission.belongsTo(models.user, {
      as: 'user',
      foreignKey: { name: 'user_id', allowNull: false }
    });
    models.submission.belongsTo(models.contest, {
      as: 'contest',
      foreignKey: { name: 'contest_id', allowNull: false }
    });
    models.submission.hasMany(models.subtestcase, {
      as: 'sub_test_cases',
      foreignKey: { name: 'submission_id', allowNull: false }
    });
  };

  return Submission;
};
