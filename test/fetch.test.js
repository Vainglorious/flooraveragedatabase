import openseaAPICall from "../assets/scripts";
import db from "../db/models";

const getFunc = () => {
  for (let index = 0; index < 99; index++) {
    setTimeout(() => {
      try {
        openseaAPICall(index);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    }, index * 1000);
  }
};

setInterval(() => getFunc(), 105);

async function getUpdatedAt(params) {
  const updatedAts = await db.Token.findAll({
    attributes: ["token_id", "createdAt", "updatedAt"],
    row: true,
  });
  Object.keys(updatedAts).map((key) => console.log(updatedAts[key].dataValues));
}

getFunc();
getUpdatedAt();
