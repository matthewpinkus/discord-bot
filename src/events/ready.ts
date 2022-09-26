import { Client } from "discord.js";
import { GUILD_ID } from "../global/Global";
import { Commands } from "../commands/Commands";

import { presence } from "../Presence";

/**
 * Client has connected and is ready to use.
 */
export default (client: Client): void => {

    client.on("ready", async () => {
        if (!client.user || !client.application) return;
        // Set list of commands
		await client.application.commands.set(Commands)
        
        // Set bot presence
        client.user?.setPresence(presence)

        console.log(`${client.user.username} has awoken at ${client.user.createdAt},\n\t\tI await your call, Master...\n`)
    });
}; 