import { Command } from "../global/Command";
import { Test } from "./Test";
import { Maxed } from "./Maxed";
import { Quote } from "./Quote";
import { Play } from "./Play";
import { GPT } from "./GPT";
import { Automations } from "./Automations";

//? List of all commands available
export const Commands: Command[] = [
  Test,
  Maxed,
  Quote,
  Play,
  GPT,
  Automations,
];
