
import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { BopCommand } from "src/commands/misc/bop";

export class ClearBopsCommand extends Command {
    protected users: string[] = [];

    constructor(client: CommandoClient) {
        super(client, {
            name: "clearbops",
            group: "misc",
            memberName: "clearbops",
            description: "clearbops"
        });
    }

    public run(msg: CommandMessage): any {
        const bopCmd = this.client.registry.findCommands("bop", true)[0] as BopCommand;
        bopCmd.users = [];

        return msg.say(`Bops cleared.`);
    }
};