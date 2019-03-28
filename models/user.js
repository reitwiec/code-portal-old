module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Username already in use'
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email already in use'
        },
        validate: {
          isEmail: true
        }
      },
      organisation: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      regno: {
        type: DataTypes.STRING(20)
      },
      phone: {
        type: DataTypes.STRING(20)
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1500
      },
      access: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      token: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
      }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    models.user.hasMany(models.submission, {
      as: 'submissions',
      foreignKey: { name: 'user_id', allowNull: false }
    });
    models.user.hasMany(models.question, {
      as: 'questions',
      foreignKey: { name: 'author_id', allowNull: false }
    });
    models.user.belongsToMany(models.question, {
      through: 'moderators',
      foreignKey: 'user_id'
    });
  };

  return User;
};
