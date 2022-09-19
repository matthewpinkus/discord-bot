import { CommandInteraction, Client } from "discord.js";
import { Command } from "../global/Command";

export const Quote: Command = {
    name: "quote",
    description: "Random quote from #quotes",
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 