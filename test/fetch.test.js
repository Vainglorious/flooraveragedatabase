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
  const updatedAts = await db.Tokens.findAll({
    attributes: ["token_id", "createdAt", "updatedAt"],
  });
  console.log(updatedAts);
}

getFunc();
getUpdatedAt();
