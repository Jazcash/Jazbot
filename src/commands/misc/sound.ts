import * as Commando from 'discord.js-commando';
import * as fs from "fs";

export class SoundCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: "sound",
            group: "misc",
            memberName: "sound",
            description: "Plays a sound",
            examples: ["sound dangernoodle"],
            args: [
                {
                    key: "name",
                    prompt: "Name of sound. Use !sounds to see all sounds",
                    type: "string"
                }
            ]
        });
    }

    public run(msg: Commando.CommandMessage, { name }: {name: string}): any {
        const vc = msg.member.voiceChannel;

        if (!vc) {return msg.reply("You need to be connected to a voice channel");}

        if (!fs.existsSync(`./sounds/${name}.ogg`)){
            return msg.reply(`File named ${name} does not exist`);
        }

        vc.join().then(connection => {
            const dispatcher = connection.playFile(`./sounds/${name}.ogg`, { volume: 0.25 });
            dispatcher.on("end", () => connection.disconnect());
        }).catch(console.error);
    }
}
