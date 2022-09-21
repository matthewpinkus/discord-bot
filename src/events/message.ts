import { Client } from "discord.js";

export default (client: Client): void => {
    client.on("messageCreate", (message: any) => {
		console.log("messageCreate called\n")
        if (!client.user || !client.application) return;
		const author = message.author.username;
        const body = message.content;
        
        console.log(`${new Date().toUTCString()}\t${author} said '${body}'`);
    });
}; 