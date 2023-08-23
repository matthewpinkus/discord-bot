import { Client } from "discord.js";

import { Commands } from "../commands/Commands";
import { presence } from "../bot/Presence";

import { Player } from "discord-player";
import { SpotifyExtractor } from "@discord-player/extractor";

/**
 * Client has connected and is ready to use.
 */
export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;
    // Set list of commands
    await client.application.commands.set(Commands);

    // Set bot presence
    client.user?.setPresence(presence);

    // Set bot music player
    const player = new Player(client);
    await player.extractors.register(SpotifyExtractor, {});

    console.log(
      `${client.user.username} has awoken at ${client.user.createdAt},\n\t\tI await your call, Master...\n`
    );
  });
};
