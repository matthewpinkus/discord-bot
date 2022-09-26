import { Client, TextChannel } from "discord.js";

import { getGames } from "epic-free-games/dist";
import { CHANNEL_IDS } from "../global/Global";
import { FreeEpicGame } from "../global/Types";

/**
 * Posts the current free games from the Epic Games Store to 
 * a specific channel for the purpose. ('CHANNEL_IDS.FREE_EPIC_GAMES')
 * @param client valid 'discord-js' Client object
 */
export async function postFreeGames(client: Client) {
	
	// TODO: Channel is 'undefined'. Fix this by creating a 
	const channel = client.channels.cache.get(CHANNEL_IDS.FREE_EPIC_GAMES) as TextChannel	 
	
	retrieveFreeEpicGames().then((res) => {
		res.forEach((t,d) => {
			// console.log(`Title: ${t.title}\nDescription: ${t.description}\nFinishes: ${t.effectiveDate}`)
			const title: string = t.title as string
			const des: string = t.description as string
			const date: string = t.effectiveDate as string
			// channel.send("test" as string)
		})
	})
}

/**
 * Retrieves a list of the current free games on the Epic Games store 
 * with the game title, description, and date the free sale ends.
 * @returns Array of type 'FreeEpicGame' with current free game information.
 */
async function retrieveFreeEpicGames(): Promise<Array<FreeEpicGame>> {
	const games: Array<FreeEpicGame> = []

	await getGames("US", true).then((res) => {

		res.currentGames.map((game) => {
			const end = game.effectiveDate.substring(0, game.effectiveDate.indexOf('T'))
			games.push({
				title: game.title,
				description: game.description,
				effectiveDate: end
			})
		})
	})
	// games.forEach((t,d) => {console.log(t, d)})
	return games
}	