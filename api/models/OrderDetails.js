const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class OrderDetails extends Model {}

OrderDetails.init(
  {
    price: {
      type: DataTypes.FLOAT,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "order_details",
  }
);


module.exports = OrderDetails;