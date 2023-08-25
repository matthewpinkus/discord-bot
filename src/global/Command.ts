// Defining the structure of Discord's '/' command.
import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}

export interface SubCommand extends ChatInputApplicationCommandData {
  run: (
    client: Client,
    interaction: CommandInteraction
  ) => void;
}
