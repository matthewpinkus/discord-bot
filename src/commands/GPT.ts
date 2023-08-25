import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  PermissionsBitField,
} from "discord.js";
import { Command } from "../global/Command";
import OpenAI from "openai";

async function askGPT(message: string, type: string): Promise<string> {
  let reply: string | null = `> ${message}\n\n`;
  const openai = new OpenAI({
    organization: "org-36nsiWiX5QecVXOt8URBObtV",
    apiKey: process.env.OPENAI_KEY,
  });

  if (type == "ask") {
    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${message}` }],
        max_tokens: 1000,
      })
      .then((res) => {
        reply += res.choices[0].message.content!
      })
      .catch((e) => {
        if (e instanceof OpenAI.APIError) {
          console.error(e.status);
          console.error(e.message);
          console.error(e.code);
          console.error(e.type);
          return e.message
        } else {
          console.log(e);
          return e
        }
      });
  } else if (type == "imagine") {
    await openai.images.generate(
      { prompt: `${message}`, n: 1, size: "256x256" }
    ).then((res) => {
      reply += res.data[0].url!
    }).catch((e) => {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
        console.error(e.code);
        console.error(e.type);
        return e.message
      } else {
        console.log(e);
        return e
      }
    });
  }

  return reply;
}

/**
 * Command: /gpt | Ask Chatgpt a question, or receive AI drawing from prompt
 */
export const GPT: Command = {
  name: "gpt",
  description: "Utilize ChatGPT features",
  defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
  options: [
    {
      name: "ask",
      type: ApplicationCommandOptionType.String,
      description: "Talk to ChatGPT",
      required: false,
      max_length: 500,
    },
    {
      name: "imagine",
      type: ApplicationCommandOptionType.String,
      description: "Request an AI digital drawing",
      required: false,
      max_length: 100,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
      let content: string = ""

      if (interaction.options.data[0] === undefined) {
        content = "Please ask me something"
      } else {
        const type: string = interaction.options.data[0].name.toString()!
        const question: string = interaction.options.data[0].value?.toString()!

        content = await askGPT(question, type)
      }
      await interaction.followUp({
        ephemeral: true,
        content,
      });

    }
  },
};
