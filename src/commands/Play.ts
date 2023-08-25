import { CommandInteraction, Client, ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../global/Command";

import { GuildQueue, Player, PlayerEvent, PlayerEventsEmitter, QueryType } from "discord-player";
import { SpotifyExtractor } from "@discord-player/extractor";
import { logToCommandHistory } from "../global/Utils";


/**
 * Dummy command module for testing and documentation.
 */
export const Play: Command = {
  name: "play",
  description: "Play some music!",
  options: [
    {
      name: "search",
      type: ApplicationCommandOptionType.String,
      description: "The song you want to play",
      required: true,
    },
    {
      name: "skip",
      type: ApplicationCommandOptionType.String,
      description: "Skip the song",
    },
    {
      name: "queue",
      type: ApplicationCommandOptionType.String,
      description: "Queue a song",
    },
    {
      name: "stop",
      type: ApplicationCommandOptionType.String,
      description: "Stop the whole queue",
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const player = new Player(client);
    // const channel = interaction.channel;
    await player.extractors.register(SpotifyExtractor, {});

    player.on("error" as any, (queue: any, error: any) => {
      console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
      logToCommandHistory(client, error.message, error, "Error emitted from the queue")

    });
    player.on("connectionError" as any, (queue: any, error: any) => {
      console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
      logToCommandHistory(client, error.message, error, "Error emitted from the connection")

    });

    player.on("trackStart" as PlayerEvent, (queue: any, track: any) => {
      queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
    });

    player.on("trackAdd" as PlayerEvent, (queue: any, track: any) => {
      queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    });

    player.on("botDisconnect" as PlayerEvent, (queue: any) => {
      queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    });

    player.on("channelEmpty" as PlayerEvent, (queue: any) => {
      queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
    });

    player.on("queueEnd" as PlayerEvent, (queue: any) => {
      queue.metadata.send("✅ | Queue finished!");
    });

    let content: string = ""

    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.followUp({ content: "You are not in a voice channel!", ephemeral: true });
    }

    // if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
    //   return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    // }

    switch (interaction.options.data[0].name) {
      case "search": {
        const query = interaction.options.data[0].value as string;

        content = `Now playing ${query}`;
        const searchResult = await player
          .search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
          })
          .catch(() => { });
        if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "No results were found!" });
        break;
      }
      default: {
        content = "Something went wrong.";
      }
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
