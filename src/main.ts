require('source-map-support').install();

import * as path from "path";
import * as fs from "fs";

import { CommandoClient } from 'discord.js-commando';

let config = require("../config");

const jazbot = new CommandoClient({
	commandPrefix: "!",
	owner: "147075197378232320",
	unknownCommandResponse: false,
	nonCommandEditable: false
});

if (!fs.existsSync("store.json")){
	let store = {timers:{},notified:[],notify:[],notified6h:[]};
	console.log("writing new file");
	fs.writeFile("store.json", JSON.stringify(store, null, "\t"), {encoding: "utf8"}, () => {});
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

jazbot.on("error", (err) => {
	console.log(err);
});

jazbot.login(config.key);
