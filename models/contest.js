module.exports = (sequelize, DataTypes) => {
  let Contest = sequelize.define(
    'contest',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
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
      tableName: 'contests'
    }
  );

  Contest.associate = models => {
    models.contest.hasMany(models.question, {
      as: 'Questions',
      foreignKey: { allowNull: false }
    });
    models.contest.hasMany(models.submission, {
      as: 'Submissions',
      foreignKey: { allowNull: false }
    });
  };

  return Contest;
};
