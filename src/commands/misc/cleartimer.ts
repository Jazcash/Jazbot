import * as fs from "fs";
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import config from "../../../config.json";

export class ClearTimerCommand extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "cleartimer",
            group: "misc",
            memberName: "cleartimer",
            description: "Clear a timer by name",
            examples: ["clear magicbeans"],
            guarded: true,
            argsPromptLimit: 0,
            args: [
                {
                    key: "name",
                    prompt: "Name of timer",
                    type: "string"
                }
            ]
        });
    }

    public hasPermission(msg: CommandMessage): boolean | string{
        return msg.guild?.id === config.guild ? true : "This command is only usable on a specific discord server";
    }

    public run(msg: CommandMessage, { name }: {name: string}): Promise<Message | Message[]> {
        const store = JSON.parse(fs.readFileSync("store.json", { encoding: "utf8"}));

        if (name in store.timers){
            delete store.timers[name];
            fs.writeFileSync("store.json", JSON.stringify(store, null, "\t"), {encoding: "utf8"});
            return msg.reply(`Timer cleared.`);
        } else {
            return msg.reply(`No timer named ${name} exists.`);
        }
    }
};
