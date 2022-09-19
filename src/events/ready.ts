import { Client } from "discord.js";
import { Commands } from "../commands/Commands";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) return;
		console.log("I await your call, Master...\n")

		await client.application.commands.set(Commands);

        console.log(`${new Date().toUTCString()}\t${client.user.username} is online`);
    });
}; 