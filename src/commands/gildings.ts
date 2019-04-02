import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { Attribute, Equipment, Gilding } from "../classes/interfaces";
import GildManager from "../classes/gildManager";

let AsciiTable = require('ascii-table');

export class GildingCommand extends Command {
	gildings: Gilding[] = [];
	equipment: Equipment[] = [];

	constructor(client: CommandoClient) {
		super(client, {
			name: "gildings",
			group: "misc",
			memberName: "gildings",
			description: "Get gildings for a specified attribute",
			examples: ["gildings unarmed"],
			argsPromptLimit: 0,
			args: [
				{
					key: "attrib",
					prompt: "Attribute you're trying to gain",
					type: "string",
					validate: (text: string) => {
						text = text[0].toUpperCase() + text.substr(1);
						if (Object.values(Attribute).includes(text)){
							return true;
						} else {
							return "Provided attribute does not exist."
						}
					},
					parse: (text:string) => {
						return text[0].toUpperCase() + text.substr(1);
					}
				}
			]
		});
	}

	public run(msg: CommandMessage, { slot, attrib }: { slot:string, attrib:Attribute }): Promise<Message | Message[]> {
		let gildings = JSON.parse(fs.readFileSync("./gildings.json", { encoding: "utf8" }));

		let gildManager = new GildManager(gildings);

		let bonusGildings = gildManager.getGildingsByBonus(attrib).sort((a, b) => b.gilds[attrib] - a.gilds[attrib]);

		let table = this.generateTable(bonusGildings, attrib);

		return msg.say(`\`\`\`${table.toString()}\`\`\``);
	}

	generateTable(gildings:Gilding[], attrib:Attribute){
		let table = new AsciiTable(`${attrib} Gildings`);
		table.setHeading("", "Gilding", "Min %", "Max %", `${attrib} Bonus (q10)`, "Gilding Attributes");

		gildings.forEach((gilding, index) => {
			let minChanceStr = `${(gilding.min * 100)}%`;
			let maxChanceStr = `${(gilding.max * 100)}%`;

			table.addRow(index + 1, gilding.name, minChanceStr, maxChanceStr, gilding.gilds[attrib], gilding.attribs.join(", "));
		});

		table.setAlign(2, AsciiTable.RIGHT);

		return table;
	}
};
