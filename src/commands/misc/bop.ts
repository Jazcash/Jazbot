
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";

export class BopCommand extends Command {
    public users: string[] = [];

    constructor(client: CommandoClient) {
        super(client, {
            name: "bop",
            group: "misc",
            memberName: "bop",
            description: "Bop"
        });
    }

    public run(msg: CommandMessage): any {
        const user = msg.member.displayName;

        if (this.users.includes(user)){
            this.users.splice(this.users.indexOf(user), 1);
        } else {
            this.users.push(user);
        }

        return msg.say(`Bops: ${this.users.join(", ")}`);
    }
};