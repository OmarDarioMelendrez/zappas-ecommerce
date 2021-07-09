const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "categories",
    timestamp: false
  }
);

module.exports = Category;
