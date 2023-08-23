import {
  CommandInteraction,
  Client,
  TextChannel,
  MessageManager,
  Collection,
} from "discord.js";

import { Command } from "../global/Command";
import { CHANNEL_IDS, MESSAGE_IDS } from "../global/Global";
/**
 * Recursive function that fetches ALL messages from a collection of messages
 */
async function fetchQuotes(messages: MessageManager) {
  let collection = new Collection();
  let next_quote: string = MESSAGE_IDS.EARLIEST_QUOTE;

  // while(next_quote !== null) {
  await messages
    .fetch({ limit: 100, after: next_quote, cache: true })
    .then((res) => {
      res.map((msg) => {
        if (collection.has(msg.id)) return collection;
        if (msg.content.startsWith('"') || msg.content.startsWith("http")) {
          collection.set(msg.id, msg.content);
          next_quote = msg.id;
        }
      });
    });
  // }

  return collection;
}

/**
 * Command: /quote
 * Lists a random quote from the '#quotes' channel
 */
export const Quote: Command = {
  name: "quote",
  description: "Random quote from #quotes",
  run: async (client: Client, interaction: CommandInteraction) => {
    const messages = (
      client.channels.cache.get(CHANNEL_IDS.QUOTES) as TextChannel
    ).messages as MessageManager;
    const collection = await fetchQuotes(messages);

    const quotes: string[] = [];

    // TODO: Format the quote
    for (let val of collection.values()) {
      quotes.push(val as string);
    }
    console.log(`size of all quotes fetched: ${quotes.length}`);

    const content = `> ${
      quotes[Math.floor(Math.random() * quotes.length - 1)]
    }`;
    await interaction.followUp({
      ephemeral: false,
      content,
    });
  },
};
