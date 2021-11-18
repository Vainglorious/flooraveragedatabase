import fetch from "node-fetch";
import db from "../../db/models";

const openseaAPICall = (token_id) =>
  setTimeout(() => {
    fetch(
      `https://api.opensea.io/api/v1/assets?token_ids=${token_id}&asset_contract_address=0x8a90cab2b38dba80c64b7734e58ee1db38b8992e&order_direction=desc&offset=0&limit=5`
    )
      .then((response) => response.json())
      .then(async ({ assets }) => {
        console.log(assets);
        const createdToken = await db.Token.create({
          token_id,
          ask_price: [undefined, null].includes(assets[0]?.last_sale)
            ? parseInt(assets[0]?.current_price) / Math.pow(10, 18)
            : "",
          last_sale: [undefined, null].includes(assets[0]?.last_sale)
            ? ""
            : parseInt(assets[0]?.total_price) / Math.pow(10, 18),
        });
        console.log(createdToken);
        return createdToken;
      })
      .catch((error) => console.log(error));
  }, 10000);

export default openseaAPICall;
