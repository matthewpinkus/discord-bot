import { Client } from "discord.js";

import { TOKEN } from './Global'

import ready from './events/ready'
import interactionCreate from "./events/interactionCreate";

console.log("I await your call, Master...")

const bot = new Client({
	intents: []
})

ready(bot)
interactionCreate(bot)

bot.login(TOKEN)