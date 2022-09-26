import { CommandInteraction, Client, TextChannel, MessageManager, Collection } from "discord.js";
import { CHANNEL_IDS } from "../global/Global";
import { Command } from "../global/Command";

/**
 * Recursive function that fetches ALL messages from a collection of messages
 */
async function fetchQuotes(messages: MessageManager, lastId?: string) {

    if(!messages) throw new Error(`expected messages, got ${typeof messages}`)
    let collection = new Collection()

    // TODO: Stop re-creating collection every time you recurse through fetchQuotes(), save them somehow
    try {
        if(lastId === undefined) {
            // Fetch first 100 messages.
            // TODO: Find a way to only fetch messages once in this function
            await messages.fetch({ limit:100 }).then((res) => {
                res.map((msg) => {
                    // I only want messages from channel that are quotes 
                    // i.e. start with quotation marks or a link  
                    if(msg.content.startsWith("\"") || msg.content.startsWith("http")) { 
                        collection.set(msg.id, msg.content)
                    }
                })
            })

            lastId = collection.lastKey() as string

        }
        // Fetch messages posted BEFORE the last id found in the first 100 and AFTER a messages
        await messages.fetch({ limit:100, before: lastId, after: '120428976123543554' }).then((res) => {
            res.map((msg) => {
                if(msg.content.startsWith("\"") || msg.content.startsWith("http")) { 
                    collection.set(msg.id, msg.content)
                }
            })
            lastId = collection.lastKey() as string
        })

        lastId = collection.lastKey() as string
        if (lastId !== '123232732900753413'){
            try {
                await fetchQuotes(messages, lastId)
            } catch(e) {
                console.log(e)
            }
        }
    } catch(e) { 
        console.log(e) 
    }
    return collection
}

/**
 * Command: /quote  
 * Lists a random quote from the '#quotes' channel
 */
export const Quote: Command = {

    name: "quote",
    description: "Random quote from #quotes",
    run: async (client: Client, interaction: CommandInteraction) => {
        const messages = (client.channels.cache.get(CHANNEL_IDS.QUOTES) as TextChannel).messages as MessageManager
        const collection = await fetchQuotes(messages)

        let quotes: string[] = []

        for (let val of collection.values()) {
            quotes.push(val as string) 
        }

        const content = `> ${quotes[Math.floor(Math.random() * quotes.length - 1)]}`
        await interaction.followUp({
            ephemeral: false,
            content
        });
    }
}; 