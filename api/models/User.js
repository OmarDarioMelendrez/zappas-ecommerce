const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [3, 100],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

User.prototype.isValidPassword = function (password) {
  // console.log("entro a verify password");
  return bcrypt.compare(password, this.password).then(res => res)
}

// User.prototype.isValidPassword = function(password){
//   return bcrypt.hash(password, this.salt).then(
//       result => {
//           return result === this.password
//       }
//   )
// }

User.beforeCreate((user)=> {
 return bcrypt.hash(user.password, saltRounds)
 .then((hash)=>{
     user.password = hash
 }).catch((err)=> {
     throw new Error()
 })
})

module.exports = User;