import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";

export class ClearTimerCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: "cleartimer",
			group: "misc",
			memberName: "cleartimer",
			description: "Clear a timer by name",
			examples: ["clear magicbeans"],
			args: [
				{
					key: "name",
					prompt: "Name of timer",
					type: "string"
				}
			]
		});
	}

	public run(msg: CommandMessage, { name }:{name:string}): Promise<Message | Message[]> {
		let store = require("../../store");

		if (name in store.timers){
			delete store.timers[name];
			fs.writeFile("store.json", JSON.stringify(store), {encoding: "utf8"}, () => {});
			return msg.say(`Timer cleared.`);
		} else {
			return msg.say(`No timer named ${name} exists.`);
		}
	}
};
