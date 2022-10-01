// * Create a function that takes in an 'interaction.createdAt' date object and formats it.

import { Collection, MessageManager } from "discord.js";

/**
 * Used for fetching quotes from the #quotes channel
 * @param fetch_limit Amount of messages to fetch
 * @param messages MessageManager object derived from a TextChannel
 * @param fetch_before Quote ID, only fetch messages before this.
 * @returns Collection of quotes and their IDs
 */
export async function fetchQuotes(fetch_limit: number, messages?: MessageManager, fetch_before?: string, ) {

	if(!messages) throw new Error(`expected messages, got ${typeof messages}`)
    let collection = new Collection()

	await messages.fetch({ limit: fetch_limit, before: fetch_before }).then((res) => {
		res.map((msg) => {
			if(msg.content.startsWith("\"") || msg.content.startsWith("http")) { 
				collection.set(msg.id, msg.content)
			}
		})
	})

	return collection
}

/**
 * Formats a YYYY-MM-DD date to human readable date
 */
export function formatDate(date: string) {
	// game.effectiveDate.substring(0, game.effectiveDate.indexOf('T'))
	const year = date.substring(0, date.indexOf('-'))
	const month = date.substring(year.length, date.indexOf('-'))
	const day = date.substring(month.length, date.indexOf('-'))
	console.log(`year: ${year} month: ${month} day: ${day}`)
}