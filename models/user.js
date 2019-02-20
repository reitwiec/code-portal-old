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
      uname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      organisation: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
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
      tableName: 'users'
    }
  );

  User.associate = models => {
    models.user.hasMany(models.submission, {
      as: 'Submissions',
      foreignKey: { allowNull: false }
    });
    models.user.hasMany(models.question, {
      as: 'Questions',
      foreignKey: { name: 'author_id', allowNull: false }
    });
    models.user.belongsToMany(models.question, {
      through: 'moderators',
      foreignKey: 'user_id'
    });
  };

  return User;
};
