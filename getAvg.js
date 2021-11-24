import { Op } from "sequelize";
import db from "./db/models";

async function getPrices() {
  const prices = await db.Token.findAll({
    where: {
      ask_price: {
        [Op.ne]: "0",
        [Op.not]: null,
      },
    },
    attributes: ["ask_price"],
  });
  return prices;
}

getPrices().then((result) => {
  let array = result.map((item) => parseFloat(item.dataValues?.ask_price));
  array = array.sort(function (a, b) {
    return a - b;
  });

  const quarter = [];
  for (let index = 0; index < array.length; index++) {
    if (index !== 0 && index % 4 === 0) {
      quarter.push({
        [index / 4]:
          (array[index - 4] +
            array[index - 3] +
            array[index - 2] +
            array[index - 1]) /
          4,
      });
    }
  }
  console.log(quarter);
});
