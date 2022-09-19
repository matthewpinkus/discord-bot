import { Client } from "discord.js";

export default (client: Client): void => {
	console.log("message(client) called\n")
    client.on("messageCreate", (message: any) => {
		console.log("messageCreated called\n")
        if (!client.user || !client.application) return;
		const author = message.author.username;

        console.log(`${new Date().toUTCString()}\t${author} has typed`);
    });
}; 