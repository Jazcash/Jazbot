import * as path from "path";
import * as fs from "fs";

import { CommandoClient } from 'discord.js-commando';

let config = require("../config");

const jazbot = new CommandoClient({
	commandPrefix: "!",
	owner: "147075197378232320",
	unknownCommandResponse: false
});

if (!fs.existsSync("store.json")){
	let store = {timers:{},notified:[],notify:[]};
	console.log("writing new file");
	fs.writeFileSync("store.json", JSON.stringify(store), {encoding: "utf8"});
}

jazbot.registry
	.registerGroups([
		['misc', 'Various commands']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

jazbot.on("ready", () => {
	console.log("Jazbot is ready!");
});

jazbot.on("error", console.error);

jazbot.login(config.key);
