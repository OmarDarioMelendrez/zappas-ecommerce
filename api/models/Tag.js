const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "tags",
    timestamp: false
  }
);

module.exports = Tag;
