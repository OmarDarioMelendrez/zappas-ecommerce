const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Role extends Model {}

Role.init(
  {
    role: {
      type: DataTypes.ENUM('Sadmin','admin','user'),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: "roles",
    timestamp: false
  }
);


module.exports = Role;