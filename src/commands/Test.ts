import { CommandInteraction, Client, PermissionsBitField } from "discord.js";
import { formatDate } from "../global/Utils";
import { Command } from "../global/Command";

/**
 * Dummy command module for testing and documentation.
 */
export const Test: Command = {
  name: "test",
  description: "Test command please ignore",
  //? Add this line to flag permit access to command for certain permissions
  defaultMemberPermissions: PermissionsBitField.Flags.Administrator,

  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "I hope this worked for you.";

    formatDate("2022-08-12");
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
