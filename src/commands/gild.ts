import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { Attribute, Equipment, Gilding } from "../classes/interfaces";
import GildManager from "../classes/gildManager";

let AsciiTable = require('ascii-table');

/*
	!gild 2L unarmed


*/

export class GildCommand extends Command {
	gildings: Gilding[] = [];
	equipment: Equipment[] = [];

	constructor(client: CommandoClient) {
		super(client, {
			name: "gild",
			aliases: ["tgild"],
			group: "misc",
			memberName: "gild",
			description: "Get best gilding route",
			examples: ["gild 2L unarmed"],
			argsPromptLimit: 0,
			args: [
				{
					key: "slot",
					prompt: "Equipment Slot",
					type: "string",
					validate: (text: string) => {
						text = text.toUpperCase();
						if (/^[1-8][L|R]$/.test(text)){
							return true;
						} else {
							return "Slot must be provided in format such as 2L."
						}
					},
					parse: (text:string) => {
						return text = text.toUpperCase();
					}
				},
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
		let tailorCredo = msg.content[1] === "t";

		let gildings = JSON.parse(fs.readFileSync("./gildings.json", { encoding: "utf8" }));
		let equipment = JSON.parse(fs.readFileSync("./equipment.json", { encoding: "utf8" }));

		let gildManager = new GildManager(gildings, equipment);

		let bonusGildings = gildManager.getGildingsByBonus(attrib).sort((a, b) => b.gilds[attrib] - a.gilds[attrib]);
		let commonAttrib = gildManager.getCommonAttribute(bonusGildings, attrib);
		//let attribGildings = gildManager.getGildingsByAttrib(bonusGildings, commonAttrib, tailorCredo);
		let bestEquipment = gildManager.getBestEquipment(slot, commonAttrib);

		if (!bestEquipment){
			return msg.say("No equipment found for that slot");
		}

		let table = this.generateTable(bestEquipment, bonusGildings, attrib, tailorCredo);

		return msg.say(`\`\`\`${table.toString()}\`\`\``);
	}

	generateTable(equipment:Equipment, gildings:Gilding[], attrib:Attribute, tailorCredo:boolean){
		let table = new AsciiTable(`${equipment.name} - ${equipment.min * 100}% - ${equipment.max * 100}% - (${equipment.attribs.join(", ")})`);
		table.setHeading("", "Gilding", "Min %", "Max %", `${attrib} Bonus (q10)`, "Gilding Attributes");

		gildings.forEach((gilding, index) => {
			let minChance = index === 0 && tailorCredo ? 1 : equipment.min * gilding.min;
			let maxChance = index === 0 && tailorCredo ? 1 : equipment.max * gilding.max;

			let minChanceStr = `${(minChance * 100).toFixed(1)}%`;
			let maxChanceStr = `${(maxChance * 100).toFixed(1)}%`;

			table.addRow(index + 1, gilding.name, minChanceStr, maxChanceStr, gilding.gilds[attrib], gilding.attribs.join(", "));
		});

		table.setAlign(2, AsciiTable.RIGHT);

		return table;
	}
};
