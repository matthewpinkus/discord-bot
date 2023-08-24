import { CommandInteraction, Client, TextChannel } from "discord.js";

import { Command } from "../global/Command";
import { CHANNEL_IDS } from "../global/Global";

/**
 * Fetch ALL messages from a collection of messages
 */
async function fetchQuotes(channel: TextChannel) {
  let messages: string[] = [];

  let pointer = await channel.messages
    .fetch({ limit: 1 })
    .then((index) => (index.size === 1 ? index.at(0) : null));

  while (pointer) {
    await channel.messages
      .fetch({ limit: 100, before: pointer.id, cache: true })
      .then((page) => {
        page.forEach((msg) => {
          if (msg.content.startsWith('"') || msg.content.startsWith("http"))
            messages.push(msg.content);
        });
        pointer = 0 < page.size ? page.at(page.size - 1) : null;
      });
  }

  return messages;
}

/**
 * Command: /quote
 * Lists a random quote from the '#quotes' channel
 */
export const Quote: Command = {
  name: "quote",
  description: "Random quote from #quotes",
  run: async (client: Client, interaction: CommandInteraction) => {
    const channel = client.channels.cache.get(
      CHANNEL_IDS.QUOTES
    ) as TextChannel;
    const quotes: string[] = await fetchQuotes(channel);

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
