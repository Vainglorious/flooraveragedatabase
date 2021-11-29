import { Op } from "sequelize";
import db from "../../db/models";

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

const getAvg = () =>
  getPrices().then((result) => {
    let array = result.map((item) => parseFloat(item.dataValues?.ask_price));
    array = array.sort(function (a, b) {
      return a - b;
    });
    const quarterObj = {};
    const quarterLength = array.length / 4;
    const querterObjWillSend = {};

    for (let index = 1; index < 5; index++) {
      for (let idx = 1; idx < quarterLength; idx++) {
        quarterObj[index] =
          quarterObj[index] === undefined
            ? array[index * idx]
            : quarterObj[index] + array[index * idx] / quarterLength;
      }
    }
    const fixedArr = Object.values(quarterObj).map((value) => value.toFixed(2));

    fixedArr.map((value, idx) => {
      querterObjWillSend[`Quarter Average #${idx + 1}`] = value;
    });
    console.log(querterObjWillSend);
    return {
      "Floor Price": array[0],
      "Amunt For Sale": array.length,
      ...querterObjWillSend,
    };
  });

export default getAvg;
