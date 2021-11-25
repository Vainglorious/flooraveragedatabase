import fetch from "node-fetch";
import webhook from "../../config/discord.config";

const discordBot = (item) => {
  const itemArray = Object.keys(item).map((key) => {
    return { name: key, value: item[key].toString() };
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
          title: "title",
          description: `avarage`,
          fields: itemArray,
          // {
          //   name: "Amount",
          //   value: "Test",
          // },

          //   thumbnail: {
          //     url: `${item?.image_url}`,
          //   },
        },
      ],
    }),
  })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export default discordBot;
