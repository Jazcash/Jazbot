import * as fs from "fs";
import { CommandoClient } from 'discord.js-commando';

import config from "../config.json";
import { TimerCommand } from "./commands/misc/timer";
import { RollCommand } from "./commands/misc/roll";
import { TimerNotifyCommand } from "./commands/misc/timernotify";
import { ClearTimerCommand } from "./commands/misc/cleartimer";
import { SoundCommand } from "./commands/misc/sound";
import { SoundsCommand } from "./commands/misc/sounds";
import { WfCommand } from "./commands/warfork/wfinfo";
import { WfListCommand } from "./commands/warfork/wflist";
import { ToggleMuteCommand } from "./commands/misc/togglemute";
import { BopCommand } from "./commands/misc/bop";
import { ClearBopsCommand } from "./commands/misc/clearbops";

const jazbot = new CommandoClient({
    commandPrefix: "!",
    owner: "147075197378232320",
    unknownCommandResponse: false,
    nonCommandEditable: true
});

if (!fs.existsSync("store.json")){
    const store = {timers:{},notified:[],notify:[],notified6h:[]};
    console.log("writing new file");
    fs.writeFileSync("store.json", JSON.stringify(store, null, "\t"), {encoding: "utf8"});
}

jazbot.registry
    .registerGroups([
        ['misc', 'Various commands'],
        ["warfork", "Warfork commands"]
    ])
    .registerDefaults()
    .registerCommands([TimerCommand, TimerNotifyCommand, ClearTimerCommand, RollCommand, SoundCommand, SoundsCommand, WfCommand, WfListCommand, ToggleMuteCommand, BopCommand, ClearBopsCommand])

jazbot.on("ready", () => {
    console.log("Jazbot is ready!");
});

jazbot.on("error", (err) => {
    console.log(err);
});

jazbot.login(config.key);
