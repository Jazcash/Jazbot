import * as path from "path";
import * as fs from "fs";

import { CommandoClient } from 'discord.js-commando';

let config = require("../config");

const havenbot = new CommandoClient({
	commandPrefix: "!",
	owner: "147075197378232320",
	unknownCommandResponse: false
});

if (!fs.existsSync("store.json")){
	let store = {timers:{},notified:[],notify:[]};
	console.log("writing new file");
	fs.writeFileSync("store.json", JSON.stringify(store), {encoding: "utf8"});
}

havenbot.registry
	.registerGroups([
		['misc', 'Various commands']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

havenbot.on("ready", () => {
	console.log("HavenBot is ready!");
});

havenbot.on("error", (err) => {
	console.log(err);
});

havenbot.on("error", console.error);

havenbot.login(config.discordkey);
