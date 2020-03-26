import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import moment from "moment";
import AsciiTable from "ascii-table";
import humanizeDuration from "humanize-duration";
import timestring from "timestring";
import config from "../../../config.json";

export class TimerCommand extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "timer",
            aliases: ["timers"],
            group: "misc",
            memberName: "timer",
            description: "Multiple custom timers",
            examples: ["timers", "timer magicbeans 2d12h", "timer magicbeans"],
            argsPromptLimit: 0,
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
                            const time = timestring(text);
                            return true;
                        } catch (err){
                            return err.message;
                        }
                    }
                }
            ]
        });

        client.setInterval(() => {
            this.checkTimers();
        }, 10000)
    }

    public hasPermission(msg: CommandMessage): boolean | string{
        return msg.guild?.id === config.guild ? true : "This command is only usable on a specific discord server";
    }

    public run(msg: CommandMessage, { name, time }: {name: string; time: any}): Promise<Message | Message[]> {
        const store = JSON.parse(fs.readFileSync("store.json", { encoding: "utf8"}));

        if (name) {
            if (name in store.timers){
                if (time){
                    return msg.reply(`Timer for that name already exists.`);
                } else {
                    const date = new Date(store.timers[name]);
                    const timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm', 's'], round: true });
                    return msg.reply(`**${name}** timer will expire in ${timeRemaining}`);
                }
            } else {
                if (time){
                    const date = new Date().setMilliseconds(timestring(time, "ms"));
                    store.timers[name] = date;
                    fs.writeFile("store.json", JSON.stringify(store, null, "\t"), {encoding: "utf8"}, () => {});
                    const timeRemaining = humanizeDuration(moment(date).diff(new Date()), { units: ['d', 'h', 'm', 's'], round: true });
                    return msg.reply(`**${name}** timer added. Expires in ${timeRemaining}.`);
                } else {
                    return msg.reply(`You must provide a time in a format such as 3d5h.`);
                }
            }
        } else {
            if (Object.keys(store.timers).length > 0) {
                const table = new AsciiTable();
                table.setHeading('Key', 'Time Remaining');

                for (const name in store.timers){
                    const date = new Date(store.timers[name]);
                    const time = moment(date).diff(new Date());
                    const timeRemaining = time > 0 ? humanizeDuration(time, { units: ['d', 'h', 'm', 's'], round: true }) : "Ended";
                    table.addRow(name, timeRemaining);
                }

                return msg.reply(`\`\`\`${table.toString()}\`\`\``);
            } else {
                return msg.reply(`There are currently no timers running.`);
            }
        }
    }

    private checkTimers(): void{
        const store = JSON.parse(fs.readFileSync("store.json", { encoding: "utf8"}));
        const channel: any = this.client.channels.get(config.channel);
        if (!channel){ console.log("no channel"); return; }

        if (!("notified6h" in store)) {store.notified6h = [];}

        const now = new Date();
        for (const name in store.timers){
            const then = new Date(store.timers[name]);
            const diffInMinutes = moment(then).diff(now, "minutes");
            // const mentions = store.notify.map((id: string) => `<@${id}>`).join(", ");
            if (then < now){
                delete store.timers[name];
                channel.send(`**${name}** timer expired.`);
            } else if (diffInMinutes <= 11 && diffInMinutes >= 9 && !store.notified.includes(name)){
                store.notified.push(name);
                const mentions = store.notify.map((id: string) => `<@${id}>`).join(", ");
                const timeRemaining = humanizeDuration(moment(then).diff(new Date()), { units: ['d', 'h', 'm', 's'], round: true });
                channel.send(`**${name}** timer will expire in ${timeRemaining}. ${mentions}`);
            }
        }

        fs.writeFile("store.json", JSON.stringify(store, null, "\t"), {encoding: "utf8"}, () => {});
    }
};
