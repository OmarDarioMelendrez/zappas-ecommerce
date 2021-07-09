const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class Review extends Model {}

Review.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 1000],
      },
    },
    raiting: {
      type: DataTypes.ENUM("1","2","3","4","5"),
      allowNull: false,
    },
  },{
    sequelize: db,
    modelName: "reviews",
    timestamp: false
  }
);



module.exports = Review;
