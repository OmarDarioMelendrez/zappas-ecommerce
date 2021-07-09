const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/index');


class ProductModel extends Model {}

ProductModel.init(
  {

    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
  },
  {
    sequelize: db,
    modelName: 'productModels'
  }
)

module.exports = ProductModel;