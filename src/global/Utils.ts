import { Client, CommandInteraction, TextChannel } from "discord.js";
import { CHANNEL_IDS } from "./Global";

/**
 * Formats a YYYY-MM-DD date to human readable date
 */
export function formatDate(date: string) {
  // game.effectiveDate.substring(0, game.effectiveDate.indexOf('T'))
  const year = date.substring(0, date.indexOf("-"));
  const month = date.substring(year.length, date.indexOf("-"));
  const day = date.substring(month.length, date.indexOf("-"));
  console.log(`year: ${year} month: ${month} day: ${day}`);
}

/**
 * Logs a message and an error to the discord channel '#command-history'
 * @param client The Client object
 * @param message The error message
 * @param error The error object
 * @param reason optional - Additional reasoning
 * @param interaction optional - Gather more data
 */
export function logToCommandHistory(client: Client, message: string, error: any, reason?: string, interaction?: CommandInteraction) {
  if (typeof interaction === undefined && typeof reason === undefined) {
    (client.channels.cache.get(CHANNEL_IDS.COMMAND_HISTORY) as TextChannel).send(
      `Error: ${error}\nMessage: ${message}`
    );
  } else if (typeof reason !== undefined) {
    (client.channels.cache.get(CHANNEL_IDS.COMMAND_HISTORY) as TextChannel).send(
      `Error: ${error}\n${reason}: ${message}`
    );
  }
  else {
    (client.channels.cache.get(CHANNEL_IDS.COMMAND_HISTORY) as TextChannel).send(
      `*/${interaction?.commandName}* called by **${interaction?.user}**`
    );
  }
}