import { Command } from "../global/Command";
import { ListFreeGames } from "./FreeEpicGames";
import { Test } from "./Test";
import { Maxed } from "./Maxed";
import { Quote } from "./Quote";
import { Play } from "./Play";
import { GPT } from "./GPT";

//? List of all commands available
export const Commands: Command[] = [
  Test,
  Maxed,
  Quote,
  ListFreeGames,
  Play,
  GPT,
];
