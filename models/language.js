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
        unique: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      multiplier: {
        type: DataTypes.DOUBLE,
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
      tableName: 'languages'
    }
  );

  Language.associate = models => {
    models.language.hasMany(models.question, {
      as: 'Questions',
      foreignKey: { name: 'checker_language_id' }
    });
    models.language.hasMany(models.submission, {
      as: 'Submissions',
      foreignKey: { allowNull: false }
    });
  };

  return Language;
};
