const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Order extends Model {}

Order.init(
  {
    state: {
      type: DataTypes.ENUM('open','pending','confirmed','rejected'),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "undefined"
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  },
  {
    sequelize: db,
    modelName: "orders",
  }
);


module.exports = Order;