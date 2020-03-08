import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";

export class ClearTimerCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: "roll",
			group: "misc",
			memberName: "roll",
			description: "Pick a random option",
			examples: ["clear magicbeans"],
			argsPromptLimit: 0,
			args: [
				{
					key: "choices",
					prompt: "List your choices, separated by spaces",
					type: "string",
					infinite: true
				}
			]
		});
	}

	public run(msg: CommandMessage, { choices }: { choices: string[] }): Promise<Message | Message[]> {
		let choice = choices[Math.floor(Math.random() * choices.length)];
		msg.say("The winner is...").then(() => {
			wait(1500);
		});

		return msg.say(`**${choice}**!`);
	}
};

function wait(ms: number) {
	var start = Date.now(),
		now = start;
	while (now - start < ms) {
		now = Date.now();
	}
}
