import { Client } from "discord.js";

import { TOKEN } from './global/Global'

import interactionCreate from "./events/interactionCreate"
import ready from './events/ready'
import message from './events/message'
import Intents from "./intents";

const client = new Client({ intents: [ Intents ] })

ready(client)
interactionCreate(client)
message(client)

client.login(TOKEN)
