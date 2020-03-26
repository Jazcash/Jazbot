// Thanks, MSC
// https://github.com/DenMSC
// https://slice.sh/warsow/oldwiki/QueryProtocols.html

import * as Commando from 'discord.js-commando';



import { Message } from 'discord.js';



export class WfNotifyCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: "wfnotify",
            group: "warfork",
            memberName: "wfnotify",
            description: "Pings you when a server matches a certain condition",
            examples: ["wfnotify"]
        });
    }

    public async run(msg: Commando.CommandMessage): Promise<Message | Message[]> {
        return msg.say("WIP");
    }
}