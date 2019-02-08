import * as Commando from 'discord.js-commando';

export class DangerNoodleCommand extends Commando.Command {

	constructor(client: Commando.CommandoClient) {
		super(client, {
			name: "dangernoodle",
			group: "misc",
			memberName: "dangernoodle",
			description: "DANGER NOODLE"
		});
	}

	public run(msg:Commando.CommandMessage): any {
		let vc = msg.member.voiceChannel;

		if (!vc) return msg.reply("You need to be connected to a voice channel");

		vc.join().then(connection => {
			const dispatcher = connection.playFile("./sounds/dangernoodle.ogg", { volume: 0.25 });
			dispatcher.on("end", () => connection.disconnect());
		}).catch(console.error);
	}
}
