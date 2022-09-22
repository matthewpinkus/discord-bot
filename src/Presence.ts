import { PresenceData } from "discord.js"

export const presence: PresenceData = {
	activities: [{ name: 'seed', type: 3 }], 
	status: 'dnd'
}

//? ActivityType:
// 0: Playing
// 1: Streaming
// 2: Listening
// 3: Watching
// 4: Custom
// 5: Competing

