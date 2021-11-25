import fetch from "node-fetch";
import db from "../../db/models";
import discordBot from "./discord.bot";

const openseaAPICall = (token_id) =>
  setTimeout(() => {
    fetch(
      `https://api.opensea.io/api/v1/assets?token_ids=${token_id}&asset_contract_address=0x8a90cab2b38dba80c64b7734e58ee1db38b8992e&order_direction=desc&offset=0&limit=5`
    )
      .then((response) => response.json())
      .then(async ({ assets }) => {
        const askPrice = [undefined, null].includes(assets[0]?.last_sale)
          ? assets[0]?.sell_orders === null
            ? 0
            : parseInt(assets[0]?.sell_orders[0]?.current_price || 0) /
              Math.pow(10, 18)
          : null;

        const lastSale = [undefined, null].includes(assets[0]?.last_sale)
          ? null
          : parseInt(assets[0]?.last_sale?.total_price || 0) / Math.pow(10, 18);

        const saleOrdersCreatedDate = [undefined, null].includes(
          assets[0]?.last_sale
        )
          ? assets[0]?.sell_orders === null
            ? null
            : assets[0]?.sell_orders[0]?.created_date
          : null;

        const values = {
          token_id,
          ask_price: askPrice?.toString() || null,
          ask_price_date: saleOrdersCreatedDate,
          last_sale: lastSale?.toString() || null,
          last_sale_date: assets[0]?.last_sale?.event_timestamp || null,
          opensea_link: assets[0]?.permalink,
        };
        const createdToken = upsert(values, { token_id: token_id.toString() });
        return createdToken;
      })
      .catch((error) => console.log(error));
  }, 10000);

export default openseaAPICall;

function upsert(values, condition) {
  return db.Token.findOne({ where: condition }).then(function (obj) {
    // if there is a record for the token id then update the record
    if (obj) return obj.update(values);
    // if there is not any record for the token id then insert a new record
    return db.Token.create(values);
  });
}
