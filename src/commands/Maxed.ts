import { CommandInteraction, Client } from "discord.js";
import { Command } from "../global/Command";

export const Maxed: Command = {
    name: "maxed",
    description: "Screenshot of Mc Durb hitting max in OSRS",
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "https://i.imgur.com/CmzGCJT.jpg";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 