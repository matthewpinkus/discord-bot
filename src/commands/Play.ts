import { CommandInteraction, Client, PermissionsBitField } from "discord.js";
import { Command } from "../global/Command";

import { useMainPlayer } from "discord-player";

/**
 * Dummy command module for testing and documentation.
 */
export const Play: Command = {
  name: "play",
  description: "Play some type of music",
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = `Now playing {song}`;
    const player = useMainPlayer();
    const channel = interaction.channel;

    console.log(interaction.channel);

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
