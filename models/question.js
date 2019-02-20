module.exports = (sequelize, DataTypes) => {
  let Question = sequelize.define(
    'question',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      input_format: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      constraints: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      output_format: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      level: {
        type: DataTypes.ENUM,
        values: ['EASY', 'MEDIUM', 'HARD'],
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      checker_path: {
        type: DataTypes.STRING(100)
      },
      time_limit: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      //   editorial: {
      //     type: DataTypes.INTEGER
      //   },
      is_practice: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'questions'
    }
  );

  Question.associate = models => {
    models.question.belongsTo(models.user, {
      as: 'author',
      foreignKey: { allowNull: false }
    });
    models.question.belongsTo(models.language, {
      as: 'checker_language'
    });
    models.question.belongsTo(models.contest, {
      as: 'contest'
    });
    models.question.hasMany(models.testcase, {
      as: 'TestCases',
      foreignKey: { allowNull: false }
    });
    models.question.hasMany(models.submission, {
      as: 'Submissions',
      foreignKey: { allowNull: false }
    });
    models.question.belongsToMany(models.user, {
      through: 'moderators',
      foreignKey: 'question_id'
    });
  };

  return Question;
};
