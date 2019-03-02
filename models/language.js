module.exports = (sequelize, DataTypes) => {
  let Language = sequelize.define(
    'language',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Language code already in use'
        }
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      multiplier: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'languages'
    }
  );

  Language.associate = models => {
    models.language.hasMany(models.question, {
      as: 'questions',
      foreignKey: { name: 'checker_language_id' }
    });
    models.language.hasMany(models.submission, {
      as: 'submissions',
      foreignKey: { name: 'language_id', allowNull: false }
    });
  };

  return Language;
};
