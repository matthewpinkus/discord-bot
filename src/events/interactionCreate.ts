import {
  CommandInteraction,
  Client,
  Interaction,
  TextChannel,
} from "discord.js";

import { Commands } from "../commands/Commands";
import { CHANNEL_IDS, DISCORD_IDS } from "../global/Global";

/**
 * Client Command: (ADD MORE INFORMATION)
 */
export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (
      interaction.isCommand() ||
      interaction.isContextMenuCommand() ||
      interaction.isChatInputCommand()
    ) {
      await handleSlashCommand(client, interaction);
    }
  });
};

/**
 * Find the command that was requested, (ADD MORE INFORMATION)
 * @param client
 * @param interaction
 */
const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({
      content: `Error! Please try again or contact ${client.users.cache.get(
        DISCORD_IDS.MATTHEW
      )}`,
    });
    return;
  }

  await interaction.deferReply();

  console.log(
    `${new Date().toUTCString()}\t /${interaction.commandName} called by ${interaction.user.username
    }`
  );

  (client.channels.cache.get(CHANNEL_IDS.COMMAND_HISTORY) as TextChannel).send(
    `*/${interaction.commandName}* called by **${interaction.user}**`
  );
  slashCommand.run(client, interaction);
};
