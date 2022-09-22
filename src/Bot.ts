import { ActivityType, Client } from "discord.js";

import { TOKEN } from './global/Global'

import Intents from "./Intents";
import { partials } from "./Partials";
import { presence } from "./Presence";

import interactionCreate from "./events/interactionCreate"
import ready from './events/ready'
import message from './events/message'

const client = new Client({ intents: [ Intents ], partials: [ partials ] })

ready(client)
interactionCreate(client)
// message(client)

client.login(TOKEN).then(() => {
	client.user?.setPresence(presence)
})
