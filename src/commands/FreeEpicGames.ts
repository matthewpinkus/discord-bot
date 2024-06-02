import {
  CommandInteraction,
  Client,
  PermissionsBitField,
  TextChannel,
} from "discord.js";

import { Command } from "../global/Command";

import { FreeEpicGame } from "../global/Types";


/**
 * Retrieves a list of the current free games on the Epic Games store
 * with the game title, description, and date the free sale ends.
 * @returns Array of type 'FreeEpicGame' with current free game information.
 */
// TODO: Fix the date to read '<day> the <date>, <month>'
// TODO: The dates are wrong :thinking:
async function retrieveFreeEpicGames(): Promise<Array<FreeEpicGame>> {
  const games: Array<FreeEpicGame> = [];
  await fetch("https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=AU&allowCountries=AU")
  .then((res) => res.json())
  .then((data) => {
    const freeGames = data.data.Catalog.searchStore.elements;
    freeGames.forEach((game: any) => {
      const title: string = game.title as string;
      const desc: string = game.description as string;
      const date: string = game.effectiveDate as string;
      const img: string = game.keyImages[0].url as string;

      games.push({
        title: title,
        description: desc,
        effectiveDate: date,
        img: img,
      });
    });
  });
  return games;
}


/**
 * Posts the current free games from the Epic Games Store to a specific
 * channel (#free-epic-games)
 */
export const ListFreeGames: Command = {
  name: "free-games",
  description: "Lists the current free games on epic games",
  defaultMemberPermissions: PermissionsBitField.Flags.Administrator,

  run: async (client: Client, interaction: CommandInteraction) => {
    // TODO: Add a way to check if games have been updated
    await retrieveFreeEpicGames();
  },
};
