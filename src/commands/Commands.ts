import { Command } from "../global/Command";
import { ListFreeGames } from "./FreeEpicGames";
import { Test } from "./Test";
import { Maxed } from "./Maxed";
import { Quote } from "./Quote";

//? List of all commands available
export const Commands: Command[] = [ Test, Maxed, Quote, ListFreeGames ];
