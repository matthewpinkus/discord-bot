import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../global/Command";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/chat";

async function askGPT(message: string): Promise<string> {
  let reply: string | null = "";
  const openai = new OpenAI({
    organization: "org-36nsiWiX5QecVXOt8URBObtV",
    apiKey: process.env.OPENAI_KEY,
  });

  await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${message}` }],
      max_tokens: 1000,
    })
    .then((res) => {
      reply = res.choices[0].message.content;
    })
    .catch((e) => {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
        console.error(e.code);
        console.error(e.type);
      } else {
        console.log(e);
      }
    });

  return reply;
}

/**
 * Dummy command module for testing and documentation.
 */
export const GPT: Command = {
  name: "gpt",
  description: "Utilize ChatGPT features",
  options: [
    {
      name: "ask",
      type: ApplicationCommandOptionType.String,
      description: "Talk to ChatGPT",
      required: false,
      autocomplete: true,
    },
    {
      name: "imagine",
      type: ApplicationCommandOptionType.String,
      description: "Request an AI digital drawing",
      required: false,
      autocomplete: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    console.log();

    const question: string = interaction.options.data[0].value?.toString()!;

    console.log("interaction: ", question);

    const content = await askGPT(question);

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
