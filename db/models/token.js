"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      token_id: DataTypes.STRING,
      ask_price: DataTypes.FLOAT,
      ask_sale_date: DataTypes.DATE,
      last_sale: DataTypes.STRING,
      last_sale_date: DataTypes.DATE,
      opensea_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
