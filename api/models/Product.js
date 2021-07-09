const { DataTypes, Model } = require("sequelize");
const Review = require('./Review');
const db = require("../db");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    raiting: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

Product.average = (id) => {
  return Review.findAll( {where: {productId : id}})
  .then(reviews => {
    let total = 0;
    reviews.map(review => {
      total += parseInt(review.raiting)
    })
    let resultado = total / reviews.length;
    return resultado
  })
}

module.exports = Product;