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
        allowNull: false,
        unique: {
          args: true,
          msg: 'Title already in use'
        }
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
        allowNull: false,
        defaultValue: false
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Slug already in use'
        }
      }
    },
    {
      underscored: true,
      tableName: 'contests'
    }
  );

  Contest.associate = models => {
    models.contest.hasMany(models.question, {
      as: 'questions',
      foreignKey: { name: 'contest_id', allowNull: false }
    });
    models.contest.hasMany(models.submission, {
      as: 'submissions',
      foreignKey: { name: 'contest_id', allowNull: false }
    });
  };

  return Contest;
};
