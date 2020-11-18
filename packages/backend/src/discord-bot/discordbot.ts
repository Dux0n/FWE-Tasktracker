const config = require("./config.json");
const Discord = require("discord.js");
import { MessageEmbed } from "discord.js";
import { Task } from "../entity/Task";
const fetch = require("node-fetch");

export const StartBot = async () => {
  const client = new Discord.Client();

  client.once("ready", () => {
    console.log("Discord bot started");
  });

  const responseObject = {
    tasks: "http://localhost:4000/api/task",
  };

  client.on("message", async (message) => {
    const prefix = config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log(command);
    try {
      if (responseObject[command]) {
        const response = await fetch(responseObject[command]);
        const tasks = await response.json();

        for (let index = 0; index < tasks.data.length; index++) {
          const obj = tasks.data[index] as Task;
          console.log(obj.name);

          const embed = new MessageEmbed().addFields(
            { name: "Name", value: obj.name },
            { name: "Description", value: obj.description },
            { name: "Created at", value: obj.createdAt },
            { name: "Updated at", value: obj.updatedAt }
          );
          message.channel.send(embed);
        }
      }
    } catch (error) {
      console.log("Something went wrong3");
      console.log(error);
    }
  });

  client.login(config.token);
};