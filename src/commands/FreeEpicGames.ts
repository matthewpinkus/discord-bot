import { CommandInteraction, Client, PermissionsBitField, TextChannel } from "discord.js";

import { Command } from "../global/Command"
import { CHANNEL_IDS } from "../global/Global";

import { FreeEpicGame } from "../global/Types";

import { getGames } from "epic-free-games/dist";

/**
 * Retrieves a list of the current free games on the Epic Games store 
 * with the game title, description, and date the free sale ends.
 * @returns Array of type 'FreeEpicGame' with current free game information.
 */
// TODO: Fix the date to read '<day> the <day>, <month>'
async function retrieveFreeEpicGames(): Promise<Array<FreeEpicGame>> {
	const games: Array<FreeEpicGame> = []
	const thumbnails: string[] = []
	let count = 0;
	await getGames("US", true).then((res) => {

		res.currentGames.map((game) => {
			const end = game.effectiveDate.substring(0, game.effectiveDate.indexOf('T'))
		
			game.keyImages.map((img) => { if (img.type === 'Thumbnail') thumbnails.push(img.url) })

			games.push({
				title: game.title,
				description: game.description,
				effectiveDate: end,
				img: thumbnails[count]
			})

			count++
		})
	})
	return games
}

/**
 * Posts the current free games from the Epic Games Store to 
 * a specific channel for the purpose. ('CHANNEL_IDS.FREE_EPIC_GAMES')
 * @param client valid 'discord-js' Client object
 */

// TODO: Put this on a timer once server is re-dockerized
async function postFreeGames(client: Client) {
	
	const channel = client.channels.cache.get(CHANNEL_IDS.FREE_EPIC_GAMES) as TextChannel	 
	
	retrieveFreeEpicGames().then((res) => {
		res.forEach((t,d) => {
			// TODO: Add a link to the game
			const title: string = t.title as string
			const desc: string = t.description as string
			const date: string = t.effectiveDate as string
			const img : string = t.img as string

			channel.send(`${img}`)
			channel.send(`**${title}**\n*Offer ends ${date}*\n\n> ${desc}`)
		})
	})
}

/**
 * Posts the current free games from the Epic Games Store to a specific
 * channel (#free-epic-games)
 */
export const ListFreeGames: Command = {

    name: "free-games",
    description: "Lists the current free games on epic games.",
	defaultMemberPermissions: PermissionsBitField.Flags.Administrator,

    run: async (client: Client, interaction: CommandInteraction) => {

		// TODO: Add a way to check if games have been updated
		await postFreeGames(client)
	
    }
}; 