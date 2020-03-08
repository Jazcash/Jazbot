import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import * as moment from "moment";

const AsciiTable = require('ascii-table');
const humanizeDuration = require('humanize-duration');
const timestring = require("timestring");

let config = require("../../config");

export class TimerCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: "timer",
			aliases: ["timers"],
			group: "misc",
			memberName: "timer",
			description: "Multiple custom timers",
			examples: ["timers", "timer magicbeans 2d12h", "timer magicbeans"],
			args: [
				{
					key: "name",
					prompt: "Name of timer",
					type: "string",
					default: ""
				},
				{
					key: "time",
					prompt: "Timestring as per https://www.npmjs.com/package/timestring",
					type: "string",
					default: "",
					validate: (text: string) => {
						try {
							let time = timestring(text);
							return true;
						} catch (err){
							return err.message;
						}
					}
				},
			]
		});

		client.setInterval(() => {
			this.checkTimers(client);
		}, 10000)
	}

	public run(msg: CommandMessage, { name, time }:{name:string, time:any}): Promise<Message | Message[]> {
		// let channel = msg.guild.channels.(config.channel);
		// if (channel && msg.channel !== channel){
		// 	return msg.say(`I only work in the ${channel.name} channel.`);
		// }

		let store = require("../../store");

		if (name) {
			if (name in store.timers){
				if (time){
					return msg.say(`Timer for that name already exists.`);
				} else {
					let date = new Date(store.timers[name]);
					let timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm'], round: true });
					return msg.say(`**${name}** timer will expire in ${timeRemaining}`);
				}
			} else {
				if (time){
					let date = new Date().setMilliseconds(timestring(time, "ms"));
					store.timers[name] = date;
					fs.writeFile("store.json", JSON.stringify(store), {encoding: "utf8"}, () => {});
					let timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm'], round: true });
					return msg.say(`**${name}** timer added. Expires in ${timeRemaining}.`);
				} else {
					return msg.say(`You must provide a time in a format such as 3d5h.`);
				}
			}
		} else {
			if (Object.keys(store.timers).length > 0) {
				let table = new AsciiTable();
				table.setHeading('Key', 'Time Remaining');

				for (let name in store.timers){
					let date = new Date(store.timers[name]);
					let timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm'], round: true });
					table.addRow(name, timeRemaining);
				}

				return msg.say(`\`\`\`${table.toString()}\`\`\``);
			} else {
				return msg.say(`There are currently no timers running.`);
			}
		}
	}

	private checkTimers(client: CommandoClient){
		let store = require("../../store");
		let channel:any = client.channels.get(config.channel);
		if (!channel){
			console.log("Channel doesn't exist");
			return;
		}

		let now = new Date();
		for (let name in store.timers){
			let then = new Date(store.timers[name]);
			if (then < now){
				delete store.timers[name];
				channel.send(`**${name}** timer expired.`);
			} else if (moment(then).diff(now, "minutes") < 60 && !store.notified.includes(name)){
				store.notified.push(name);
				let mentions = store.notify.map((id:string) => `<@${id}>`).join(", ");
				let timeRemaining = humanizeDuration(moment(then).diff(new Date()), { units: ['d', 'h', 'm'], round: true });
				channel.send(`**${name}** timer will expire in ${timeRemaining}. ${mentions}`);
			}
		}

		fs.writeFile("store.json", JSON.stringify(store), {encoding: "utf8"}, () => {});
	}
};
