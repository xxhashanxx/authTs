'use strict';
module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
      'user',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        lastName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        firstName: {
          type: DataTypes.STRING(80),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: true,
          validate: {
            isEmail: true,
            notEmpty: true,
          },
        },

      },
      {
        timestamps: true,
        paranoid: true,
      },
    );
  
    user.associate = (models) => {
      models.user.hasMany(models.userRole, {
        as: 'roles',
      });  
      models.user.belongsTo(models.user, {
        as: 'createdBy',
      });
  
      models.user.belongsTo(models.user, {
        as: 'updatedBy',
      });
    };
  
    return user;
  };
  