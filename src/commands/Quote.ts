import { CommandInteraction, Client, TextChannel, MessageManager, Collection } from "discord.js";
import { CHANNEL_IDS } from "../global/Global";
import { Command } from "../global/Command";

async function fetchQuotes(messages: MessageManager) {
    if(!messages) throw new Error(`expected messages, got ${typeof messages}`)
    let quotes: string[] = []
    try {
        await messages.fetch().then((res) => {
            res.map((msg) => {
                // I only want messages from channel that are quotes 
                // i.e. start with quotation marks or a link  
                if(msg.content.startsWith("\"") || msg.content.startsWith("http")) { quotes.push(msg.content) }
            })
        })
    } catch(e) { console.log(e) }
    
    return quotes
}

export const Quote: Command = {
    name: "quote",
    description: "Random quote from #quotes",
    run: async (client: Client, interaction: CommandInteraction) => {
        const channel = client.channels.cache.get(CHANNEL_IDS.QUOTES) as TextChannel
        const messages = channel.messages as MessageManager
        let quotes: string[] = await fetchQuotes(messages)
        const content = `> ${quotes[Math.floor(Math.random() * quotes.length - 1)]}`

        await interaction.followUp({
            ephemeral: false,
            content
        });
    }
}; 