import fetch from "node-fetch";
import webhook from "../../config/discord.config";

const floorpriceDiscordBot = (item) => {
  const itemArray = Object.keys(item).map((key) => {
    return { name: key, value: item[key]?.toString() };
  });
  fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "test",
      content: "",
      tts: false,
      embeds: [
        {
          type: "rich",
          color: 1127128,
          title: "Doodle Metrics",
          description: "opensea-api (2.5hr cycle)",
          fields: itemArray,
        },
      ],
    }),
  })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export default floorpriceDiscordBot;
