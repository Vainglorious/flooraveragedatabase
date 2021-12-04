import { Op } from "sequelize";
import db from "../../db/models";

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}

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
    console.log(arrayWithId.filter((item, index) => index < 4));
    console.log(array.filter((item, index) => index < 4));
    return {
      "Floor Price": array[0],
      "Amunt For Sale": array.length,
      ...quarterObjWillSend,
    };
  });

export default getAvg;
