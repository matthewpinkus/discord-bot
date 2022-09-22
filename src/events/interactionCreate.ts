import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands/Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred following up with slash command." });
        return;
    }   
    
    await interaction.deferReply();
    
    console.log(`${new Date().toUTCString()}\t /${ interaction.commandName } called by ${ interaction.user.username }`); 
    slashCommand.run(client, interaction);
}; 