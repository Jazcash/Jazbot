import * as Commando from 'discord.js-commando';
import * as fs from "fs";

export class SoundsCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: "sounds",
            group: "misc",
            memberName: "sounds",
            description: "Lists all available sounds"
        });
    }

    public run(msg: Commando.CommandMessage): any {
        const sounds = fs.readdirSync("./sounds").map(soundFile => soundFile.split(".")[0]);
        msg.say(`**Sounds:** ${sounds.join(", ")}`);
    }
}
