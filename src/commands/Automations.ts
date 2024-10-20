import {
  ApplicationCommandOptionType,
    Client,
    CommandInteraction,
    PermissionsBitField,
    TextChannel,
  } from "discord.js";
  
import { CHANNEL_IDS } from "../global/Global";
import { FreeEpicGame } from "../global/Types";
import { Command } from "src/global/Command";

/**
 * Retrieves a list of the current free games on the Epic Games store
 * with the game title, description, and date the free sale ends.
 * @returns Array of type 'FreeEpicGame' with current free game information.
 */
async function postFreeGames(client: Client) {
  const freeGame: FreeEpicGame = {} as FreeEpicGame;
  const channel = await client.channels.cache.get(
    CHANNEL_IDS.FREE_EPIC_GAMES
  ) as TextChannel;

  await fetch("https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=AU&allowCountries=AU")
    .then((res) => res.json())
    .then((data) => {
      for (const game of data.data.Catalog.searchStore.elements) {
        if (game.price.totalPrice.discountPrice === 0) {
            freeGame.title = game.title;
            freeGame.description = game.description;
            freeGame.thumbnail = game.keyImages[0].url;
            freeGame.url = `https://www.epicgames.com/store/en-US/p/${game.productSlug}`
            freeGame.effectiveDate = new Date(game.effectiveDate);
            break;
        }
    }});
  
    channel.send({ content: freeGame.thumbnail });
    channel.send({ content: `**${freeGame.title}**\n*Offer ends ${freeGame.effectiveDate}*\n\n> ${freeGame.description}\n\n${freeGame.url}`});
}

function runAutomations(client: Client) {
    postFreeGames(client);
}

/**
 * Command to start running automations
 * @returns void
 */
export const Automations: Command = {
  name: "automations",
  description: "Starts running automations",
  //? Add this line to flag permit access to command for certain permissions
  defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
  run: async (client: Client, interaction: CommandInteraction) => {
    runAutomations(client);

    await interaction.followUp({
      ephemeral: true,
    });
  },
};