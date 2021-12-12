import { Op } from "sequelize";

const db = require("../db/models");
async function getFloorprice() {
  try {
    const data = await db.Token.findOne({
      where: {
        ask_price: {
          [Op.ne]: "0",
          [Op.not]: null,
        },
      },
      order: [["ask_price", "ASC"]],
      raw: true,
      attributes: ["ask_price"],
    });
    return data.ask_price;
  } catch (error) {
    return error;
  }
}

getFloorprice()
  .then((result) => console.log(result))
  .catch((error) => console.log(error))
  .finally(() => process.exit(1));
