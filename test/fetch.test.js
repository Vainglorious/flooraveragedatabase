import openseaAPICall from "../assets/scripts";
import db from "../db/models";
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
setInterval(() => {
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
}, 100000);
