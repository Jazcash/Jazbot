import * as Commando from 'discord.js-commando';

export class ToggleMuteCommand extends Commando.Command {
    protected muted: boolean = false;

    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: "togglemute",
            group: "misc",
            memberName: "togglemute",
            description: "Toggle server mutes everyone in the voice channel you are in"
        });
    }

    public run(msg: Commando.CommandMessage): any {
        const vc = msg.member.voiceChannel;

        if (!vc) {
            return msg.reply("You need to be connected to a voice channel");
        }

        this.muted = !this.muted;

        vc.members.forEach(member => {
            member.setMute(this.muted);
        });
    }
}
