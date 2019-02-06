import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import * as moment from "moment";
let AsciiTable = require('ascii-table')
const humanizeDuration = require('humanize-duration')

/*
!timer bob - shows time left until timer expires for bob
!timer bob 15d3h - starts new timer with name bob that expires in 15 days and 3 hours
!timer - prints table of all timers
*/

export class TimerCommand extends Command {
	constructor(client:CommandoClient) {
		super(client, {
			name: "timer",
			group: "misc",
			memberName: "timer",
			description: "Multiple custom timers",
			examples: ["timer magicbeans 2d12h"],
			throttling: {
				usages: 5,
				duration: 10
			},
			args: [
				{
					key: "name",
					prompt: "Name of timer",
					type: "string",
					default: ""
				},
				{
					key: "time",
					prompt: "Time in hours",
					type: "string",
					default: "",
					validate: (text: string) => {
						if (/^(?:((?<days>\d+)d)?(?:(?<hours>\d+)h)?)$/.test(text)){
							return true;
						} else {
							return "You must provide a time in a format such as 3d5h."
						}
					}
				},
			]
		});

		client.setInterval(() => {
			this.clearExpiredTimers(client);
		}, 10000)
	}

	public async run(msg: CommandMessage, { name, time }:{name:string, time:any}): Promise<Message | Message[]> {
		let store = require("../../store");

		if (name) {
			if (name in store.timers){
				if (time){
					return msg.say(`Timer for that name already exists.`);
				} else {
					let date = new Date(store.timers[name]);
					let timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm'], round: true });
					return msg.say(`${timeRemaining}`);
				}
			} else {
				if (time){
					let {days = 0, hours = 0} = time.match(/^(?:((?<days>\d+)d)?(?:(?<hours>\d+)h)?)$/).groups;
					let date = new Date();
					let totalHours = (parseInt(days) * 24) + parseInt(hours);
					date.setHours(date.getHours() + totalHours);
					store.timers[name] = date;
					fs.writeFile("store.json", JSON.stringify(store), {encoding: "utf8"}, () => {});
					let timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm'], round: true });
					return msg.say(`${name} timer added. Expires in ${timeRemaining}`);
				} else {
					return msg.say(`You must provide a time in a format such as 3d5h.`);
				}
			}
		} else {
			if (Object.keys(store.timers).length > 0) {
				let table = new AsciiTable("Timers");
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

	private clearExpiredTimers(client: CommandoClient){
		let store = require("../../store");

		let now = new Date();
		for (let name in store.timers){
			let then = new Date(store.timers[name]);
			if (then < now){
				delete store.timers[name];
				let timerChannel:any = client.channels.get("541927551648661504");
				timerChannel.send(`${name} timer expired.`);
			}
		}
	}
};
