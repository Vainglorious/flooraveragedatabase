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
    attributes: ["ask_price", "token_id"],
  });
  return prices;
}

const getAvg = () =>
  getPrices().then((result) => {
    let arrayWithId = result.map((item) => {
      return {
        price: parseFloat(item.dataValues?.ask_price),
        token: item.dataValues?.token_id,
      };
    });
    let array = result.map((item) => parseFloat(item.dataValues?.ask_price));
    array = array.sort(function (a, b) {
      return a - b;
    });
    arrayWithId = arrayWithId.sort(function (a, b) {
      return a.price - b.price;
    });

    const quarterObj = {};
    const quarterLength = array.length / 4;
    const quarterObjWillSend = {};

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
      quarterObjWillSend[`Quarter Average #${idx + 1}`] = value;
    });
    // console.log(arrayWithId.filter((item, index) => index < 4));
    // console.log(array.filter((item, index) => index < 4));
    return {
      "Floor Price": array[0],
      "Amount For Sale": array.length,
      ...quarterObjWillSend,
    };
  });

export default getAvg;
