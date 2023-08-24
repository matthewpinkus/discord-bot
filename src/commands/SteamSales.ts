import { CommandInteraction, Client } from "discord.js";
import { Command } from "../global/Command";

/**
 * Dummy command module for testing and documentation.
 */
export const SteamSales: Command = {
  name: "sales",
  description: "List the current sales from a platform",

  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "I hope this worked for you.";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
