/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/*! exports provided: apps, key, channel, guild, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"apps\\\":[{\\\"name\\\":\\\"Jazbot\\\",\\\"script\\\":\\\"./build/main.js\\\",\\\"watch\\\":true,\\\"env\\\":{\\\"NODE_ENV\\\":\\\"development\\\"},\\\"env_production\\\":{\\\"NODE_ENV\\\":\\\"production\\\"}}],\\\"key\\\":\\\"NTQ1NTUxOTYyMjY0MDQzNTIw.XmZMtA.k7F49tAGHf_LQjjMreL8lWHZO3Q\\\",\\\"channel\\\":\\\"542776093103620164\\\",\\\"guild\\\":\\\"539596164891410452\\\"}\");\n\n//# sourceURL=webpack:///./config.json?");

/***/ }),

/***/ "./src/commands/misc/cleartimer.ts":
/*!*****************************************!*\
  !*** ./src/commands/misc/cleartimer.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nconst discord_js_commando_1 = __webpack_require__(/*! discord.js-commando */ \"discord.js-commando\");\r\nconst config_json_1 = __importDefault(__webpack_require__(/*! ../../../config.json */ \"./config.json\"));\r\nclass ClearTimerCommand extends discord_js_commando_1.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"cleartimer\",\r\n            group: \"misc\",\r\n            memberName: \"cleartimer\",\r\n            description: \"Clear a timer by name\",\r\n            examples: [\"clear magicbeans\"],\r\n            guarded: true,\r\n            argsPromptLimit: 0,\r\n            args: [\r\n                {\r\n                    key: \"name\",\r\n                    prompt: \"Name of timer\",\r\n                    type: \"string\"\r\n                }\r\n            ]\r\n        });\r\n    }\r\n    hasPermission(msg) {\r\n        var _a;\r\n        return ((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) === config_json_1.default.guild ? true : \"This command is only usable on a specific discord server\";\r\n    }\r\n    run(msg, { name }) {\r\n        const store = JSON.parse(fs.readFileSync(\"store.json\", { encoding: \"utf8\" }));\r\n        if (name in store.timers) {\r\n            delete store.timers[name];\r\n            fs.writeFileSync(\"store.json\", JSON.stringify(store, null, \"\\t\"), { encoding: \"utf8\" });\r\n            return msg.reply(`Timer cleared.`);\r\n        }\r\n        else {\r\n            return msg.reply(`No timer named ${name} exists.`);\r\n        }\r\n    }\r\n}\r\nexports.ClearTimerCommand = ClearTimerCommand;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/commands/misc/cleartimer.ts?");

/***/ }),

/***/ "./src/commands/misc/roll.ts":
/*!***********************************!*\
  !*** ./src/commands/misc/roll.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst discord_js_commando_1 = __webpack_require__(/*! discord.js-commando */ \"discord.js-commando\");\r\nclass RollCommand extends discord_js_commando_1.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"roll\",\r\n            group: \"misc\",\r\n            memberName: \"roll\",\r\n            description: \"Pick a random option\",\r\n            examples: [\"clear magicbeans\"],\r\n            argsPromptLimit: 0,\r\n            args: [\r\n                {\r\n                    key: \"choices\",\r\n                    prompt: \"List your choices, separated by spaces\",\r\n                    type: \"string\",\r\n                    infinite: true\r\n                }\r\n            ]\r\n        });\r\n    }\r\n    run(msg, { choices }) {\r\n        const choice = choices[Math.floor(Math.random() * choices.length)];\r\n        msg.say(\"The winner is...\").then(() => {\r\n            wait(1500);\r\n        });\r\n        return msg.say(`**${choice}**!`);\r\n    }\r\n}\r\nexports.RollCommand = RollCommand;\r\n;\r\nfunction wait(ms) {\r\n    const start = Date.now();\r\n    let now = start;\r\n    while (now - start < ms) {\r\n        now = Date.now();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/misc/roll.ts?");

/***/ }),

/***/ "./src/commands/misc/sound.ts":
/*!************************************!*\
  !*** ./src/commands/misc/sound.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Commando = __importStar(__webpack_require__(/*! discord.js-commando */ \"discord.js-commando\"));\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nclass SoundCommand extends Commando.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"sound\",\r\n            group: \"misc\",\r\n            memberName: \"sound\",\r\n            description: \"Plays a sound\",\r\n            examples: [\"sound dangernoodle\"],\r\n            args: [\r\n                {\r\n                    key: \"name\",\r\n                    prompt: \"Name of sound. Use !sounds to see all sounds\",\r\n                    type: \"string\"\r\n                }\r\n            ]\r\n        });\r\n    }\r\n    run(msg, { name }) {\r\n        const vc = msg.member.voiceChannel;\r\n        if (!vc) {\r\n            return msg.reply(\"You need to be connected to a voice channel\");\r\n        }\r\n        if (!fs.existsSync(`./sounds/${name}.ogg`)) {\r\n            return msg.reply(`File named ${name} does not exist`);\r\n        }\r\n        vc.join().then(connection => {\r\n            const dispatcher = connection.playFile(`./sounds/${name}.ogg`, { volume: 0.25 });\r\n            dispatcher.on(\"end\", () => connection.disconnect());\r\n        }).catch(console.error);\r\n    }\r\n}\r\nexports.SoundCommand = SoundCommand;\r\n\n\n//# sourceURL=webpack:///./src/commands/misc/sound.ts?");

/***/ }),

/***/ "./src/commands/misc/sounds.ts":
/*!*************************************!*\
  !*** ./src/commands/misc/sounds.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Commando = __importStar(__webpack_require__(/*! discord.js-commando */ \"discord.js-commando\"));\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nclass SoundsCommand extends Commando.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"sounds\",\r\n            group: \"misc\",\r\n            memberName: \"sounds\",\r\n            description: \"Lists all available sounds\"\r\n        });\r\n    }\r\n    run(msg) {\r\n        const sounds = fs.readdirSync(\"./sounds\").map(soundFile => soundFile.split(\".\")[0]);\r\n        msg.say(`**Sounds:** ${sounds.join(\", \")}`);\r\n    }\r\n}\r\nexports.SoundsCommand = SoundsCommand;\r\n\n\n//# sourceURL=webpack:///./src/commands/misc/sounds.ts?");

/***/ }),

/***/ "./src/commands/misc/timer.ts":
/*!************************************!*\
  !*** ./src/commands/misc/timer.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nconst discord_js_commando_1 = __webpack_require__(/*! discord.js-commando */ \"discord.js-commando\");\r\nconst moment_1 = __importDefault(__webpack_require__(/*! moment */ \"moment\"));\r\nconst ascii_table_1 = __importDefault(__webpack_require__(/*! ascii-table */ \"ascii-table\"));\r\nconst humanize_duration_1 = __importDefault(__webpack_require__(/*! humanize-duration */ \"humanize-duration\"));\r\nconst timestring_1 = __importDefault(__webpack_require__(/*! timestring */ \"timestring\"));\r\nconst config_json_1 = __importDefault(__webpack_require__(/*! ../../../config.json */ \"./config.json\"));\r\nclass TimerCommand extends discord_js_commando_1.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"timer\",\r\n            aliases: [\"timers\"],\r\n            group: \"misc\",\r\n            memberName: \"timer\",\r\n            description: \"Multiple custom timers\",\r\n            examples: [\"timers\", \"timer magicbeans 2d12h\", \"timer magicbeans\"],\r\n            argsPromptLimit: 0,\r\n            args: [\r\n                {\r\n                    key: \"name\",\r\n                    prompt: \"Name of timer\",\r\n                    type: \"string\",\r\n                    default: \"\"\r\n                },\r\n                {\r\n                    key: \"time\",\r\n                    prompt: \"Timestring as per https://www.npmjs.com/package/timestring\",\r\n                    type: \"string\",\r\n                    default: \"\",\r\n                    validate: (text) => {\r\n                        try {\r\n                            const time = timestring_1.default(text);\r\n                            return true;\r\n                        }\r\n                        catch (err) {\r\n                            return err.message;\r\n                        }\r\n                    }\r\n                }\r\n            ]\r\n        });\r\n        client.setInterval(() => {\r\n            this.checkTimers();\r\n        }, 10000);\r\n    }\r\n    hasPermission(msg) {\r\n        var _a;\r\n        return ((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) === config_json_1.default.guild ? true : \"This command is only usable on a specific discord server\";\r\n    }\r\n    run(msg, { name, time }) {\r\n        const store = JSON.parse(fs.readFileSync(\"store.json\", { encoding: \"utf8\" }));\r\n        if (name) {\r\n            if (name in store.timers) {\r\n                if (time) {\r\n                    return msg.reply(`Timer for that name already exists.`);\r\n                }\r\n                else {\r\n                    const date = new Date(store.timers[name]);\r\n                    const timeRemaining = humanize_duration_1.default(moment_1.default(date).diff(new Date()), { units: ['d', 'h', 'm', 's'], round: true });\r\n                    return msg.reply(`**${name}** timer will expire in ${timeRemaining}`);\r\n                }\r\n            }\r\n            else {\r\n                if (time) {\r\n                    const date = new Date().setMilliseconds(timestring_1.default(time, \"ms\"));\r\n                    store.timers[name] = date;\r\n                    fs.writeFile(\"store.json\", JSON.stringify(store, null, \"\\t\"), { encoding: \"utf8\" }, () => { });\r\n                    const timeRemaining = humanize_duration_1.default(moment_1.default(date).diff(new Date()), { units: ['d', 'h', 'm', 's'], round: true });\r\n                    return msg.reply(`**${name}** timer added. Expires in ${timeRemaining}.`);\r\n                }\r\n                else {\r\n                    return msg.reply(`You must provide a time in a format such as 3d5h.`);\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            if (Object.keys(store.timers).length > 0) {\r\n                const table = new ascii_table_1.default();\r\n                table.setHeading('Key', 'Time Remaining');\r\n                for (const name in store.timers) {\r\n                    const date = new Date(store.timers[name]);\r\n                    const time = moment_1.default(date).diff(new Date());\r\n                    const timeRemaining = time > 0 ? humanize_duration_1.default(time, { units: ['d', 'h', 'm', 's'], round: true }) : \"Ended\";\r\n                    table.addRow(name, timeRemaining);\r\n                }\r\n                return msg.reply(`\\`\\`\\`${table.toString()}\\`\\`\\``);\r\n            }\r\n            else {\r\n                return msg.reply(`There are currently no timers running.`);\r\n            }\r\n        }\r\n    }\r\n    checkTimers() {\r\n        const store = JSON.parse(fs.readFileSync(\"store.json\", { encoding: \"utf8\" }));\r\n        const channel = this.client.channels.get(config_json_1.default.channel);\r\n        if (!channel) {\r\n            console.log(\"no channel\");\r\n            return;\r\n        }\r\n        if (!(\"notified6h\" in store)) {\r\n            store.notified6h = [];\r\n        }\r\n        const now = new Date();\r\n        for (const name in store.timers) {\r\n            const then = new Date(store.timers[name]);\r\n            const diffInMinutes = moment_1.default(then).diff(now, \"minutes\");\r\n            // const mentions = store.notify.map((id: string) => `<@${id}>`).join(\", \");\r\n            if (then < now) {\r\n                delete store.timers[name];\r\n                channel.send(`**${name}** timer expired.`);\r\n            }\r\n            else if (diffInMinutes <= 11 && diffInMinutes >= 9 && !store.notified.includes(name)) {\r\n                store.notified.push(name);\r\n                const mentions = store.notify.map((id) => `<@${id}>`).join(\", \");\r\n                const timeRemaining = humanize_duration_1.default(moment_1.default(then).diff(new Date()), { units: ['d', 'h', 'm', 's'], round: true });\r\n                channel.send(`**${name}** timer will expire in ${timeRemaining}. ${mentions}`);\r\n            }\r\n        }\r\n        fs.writeFile(\"store.json\", JSON.stringify(store, null, \"\\t\"), { encoding: \"utf8\" }, () => { });\r\n    }\r\n}\r\nexports.TimerCommand = TimerCommand;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/commands/misc/timer.ts?");

/***/ }),

/***/ "./src/commands/misc/timernotify.ts":
/*!******************************************!*\
  !*** ./src/commands/misc/timernotify.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nconst discord_js_commando_1 = __webpack_require__(/*! discord.js-commando */ \"discord.js-commando\");\r\nclass TimerNotifyCommand extends discord_js_commando_1.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"timernotify\",\r\n            group: \"misc\",\r\n            memberName: \"timernotify\",\r\n            description: \"Toggle your notification preference for timers\"\r\n        });\r\n    }\r\n    run(msg) {\r\n        const store = JSON.parse(fs.readFileSync(\"store.json\", { encoding: \"utf8\" }));\r\n        const userid = msg.member.id;\r\n        if (store.notify.includes(userid)) {\r\n            store.notify = store.notify.filter((id) => id !== userid);\r\n            fs.writeFile(\"store.json\", JSON.stringify(store), { encoding: \"utf8\" }, () => { });\r\n            return msg.say(`You will no longer be notified of timers.`);\r\n        }\r\n        else {\r\n            store.notify.push(userid);\r\n            fs.writeFile(\"store.json\", JSON.stringify(store), { encoding: \"utf8\" }, () => { });\r\n            return msg.say(`You will now receive timer notifications.`);\r\n        }\r\n    }\r\n}\r\nexports.TimerNotifyCommand = TimerNotifyCommand;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/commands/misc/timernotify.ts?");

/***/ }),

/***/ "./src/commands/warfork/types.ts":
/*!***************************************!*\
  !*** ./src/commands/warfork/types.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Team;\r\n(function (Team) {\r\n    Team[Team[\"ALPHA\"] = 2] = \"ALPHA\";\r\n    Team[Team[\"BETA\"] = 3] = \"BETA\";\r\n    Team[Team[\"SPEC\"] = 0] = \"SPEC\";\r\n})(Team = exports.Team || (exports.Team = {}));\r\n\n\n//# sourceURL=webpack:///./src/commands/warfork/types.ts?");

/***/ }),

/***/ "./src/commands/warfork/wfinfo.ts":
/*!****************************************!*\
  !*** ./src/commands/warfork/wfinfo.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n// Thanks, MSC\r\n// https://github.com/DenMSC\r\n// https://slice.sh/warsow/oldwiki/QueryProtocols.html\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Commando = __importStar(__webpack_require__(/*! discord.js-commando */ \"discord.js-commando\"));\r\nconst dgram = __importStar(__webpack_require__(/*! dgram */ \"dgram\"));\r\nconst ascii_table_1 = __importDefault(__webpack_require__(/*! ascii-table */ \"ascii-table\"));\r\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/commands/warfork/types.ts\");\r\nconst OOB_PADDING = '\\xFF\\xFF\\xFF\\xFF';\r\nconst REQUESTINFO = OOB_PADDING + 'getstatus';\r\nconst REQUESTHEADER = OOB_PADDING + 'statusResponse\\n\\\\';\r\nclass WfCommand extends Commando.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"wfinfo\",\r\n            group: \"warfork\",\r\n            memberName: \"wfinfo\",\r\n            description: \"Get server info\",\r\n            examples: [\"wfinfo jazcash.com\"],\r\n            args: [\r\n                {\r\n                    key: \"server\",\r\n                    prompt: \"Hostname or IP\",\r\n                    type: \"string\"\r\n                },\r\n                {\r\n                    key: \"port\",\r\n                    prompt: \"Server port. Usually either 27950 or 44400 for Warsow/Warfork\",\r\n                    type: \"integer\",\r\n                    default: 44400\r\n                }\r\n            ]\r\n        });\r\n    }\r\n    run(msg, { server, port }) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (server.includes(\":\")) {\r\n                port = parseInt(server.split(\":\")[1]);\r\n                server = server.split(\":\")[0];\r\n            }\r\n            const info = yield this.getInfo(server, port);\r\n            if (info) {\r\n                return msg.say(this.formatServerInfo(info));\r\n            }\r\n            else {\r\n                return msg.say(\"There was an error querying that server\");\r\n            }\r\n        });\r\n    }\r\n    getInfo(server, port) {\r\n        return new Promise(resolve => {\r\n            const socket = dgram.createSocket(\"udp4\");\r\n            const message = Buffer.from(REQUESTINFO, \"ascii\");\r\n            socket.send(message, 0, message.length, port, server);\r\n            const timeout = setTimeout(() => {\r\n                clearTimeout(timeout);\r\n                resolve();\r\n            }, 2000);\r\n            socket.on(\"error\", (err) => {\r\n                clearTimeout(timeout);\r\n                resolve();\r\n            });\r\n            socket.on(\"message\", (res, rinfo) => {\r\n                socket.close();\r\n                const msg = res.toString(\"ascii\", REQUESTHEADER.length);\r\n                const serverInfo = this.parseResponse(msg, rinfo.address, rinfo.port);\r\n                clearTimeout(timeout);\r\n                resolve(serverInfo);\r\n            });\r\n        });\r\n    }\r\n    parseResponse(msg, ip, port) {\r\n        var _a, _b;\r\n        const parts = msg.split(\"\\n\");\r\n        const infoParts = parts.shift().split(\"\\\\\");\r\n        parts.pop();\r\n        const clientParts = parts;\r\n        const rawServerInfo = {};\r\n        for (let i = 0; i < infoParts.length; i += 2) {\r\n            rawServerInfo[infoParts[i]] = infoParts[i + 1];\r\n        }\r\n        const scores = (_b = (_a = rawServerInfo.g_match_score.split(\"FORBIDDEN: \")[1]) === null || _a === void 0 ? void 0 : _a.split(\" ICY: \").map(x => parseInt(x)), (_b !== null && _b !== void 0 ? _b : null));\r\n        return {\r\n            ip,\r\n            port,\r\n            title: JSON.stringify(rawServerInfo.sv_hostname).replace(/\\\"|\\^\\d|e\\\\b.*/g, \"\"),\r\n            version: rawServerInfo.version,\r\n            isPrivate: rawServerInfo.g_neepass === \"1\",\r\n            isInstagib: rawServerInfo.g_instagib === \"1\",\r\n            isRace: rawServerInfo.g_race_gametype === \"1\",\r\n            gametime: rawServerInfo.g_match_time,\r\n            maxClients: parseInt(rawServerInfo.sv_maxclients),\r\n            gametype: rawServerInfo.gametype,\r\n            map: rawServerInfo.mapname,\r\n            score: scores ? { alpha: scores[0], beta: scores[1] } : null,\r\n            clients: clientParts.map(str => {\r\n                const parts = str.match(/(?:[^\\s\"]+|\"[^\"]*\")+/g);\r\n                return {\r\n                    score: parseInt(parts[0]),\r\n                    ping: parseInt(parts[1]),\r\n                    name: parts[2].replace(/\\\"|\\^\\d/g, \"\"),\r\n                    team: parseInt(parts[3]),\r\n                    isSpec: parts[0] === \"-9999\"\r\n                };\r\n            })\r\n        };\r\n    }\r\n    formatServerInfo(info) {\r\n        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;\r\n        let str = \"```\\n\";\r\n        str += `${info.title} - ${info.gametype} - ${info.clients.length}/${info.maxClients} - ${info.map} - ${info.ip}:${info.port}\\n`;\r\n        const players = info.clients.filter(client => !client.isSpec);\r\n        const specs = info.clients.filter(client => client.isSpec);\r\n        if (players.length) {\r\n            const table = new ascii_table_1.default();\r\n            table.setHeading(\"Alpha\", (_b = (_a = info.score) === null || _a === void 0 ? void 0 : _a.alpha, (_b !== null && _b !== void 0 ? _b : 0)), \"Beta\", (_d = (_c = info.score) === null || _c === void 0 ? void 0 : _c.beta, (_d !== null && _d !== void 0 ? _d : 0)));\r\n            const alpha = players.filter(player => player.team === types_1.Team.ALPHA).sort((a, b) => b.score - a.score);\r\n            const beta = players.filter(player => player.team === types_1.Team.BETA).sort((a, b) => b.score - a.score);\r\n            for (let i = 0; i < Math.max(alpha.length, beta.length); i++) {\r\n                const player = alpha[i];\r\n                const nextPlayer = beta[i];\r\n                table.addRow((_f = (_e = player) === null || _e === void 0 ? void 0 : _e.name, (_f !== null && _f !== void 0 ? _f : \" \")), (_h = (_g = player) === null || _g === void 0 ? void 0 : _g.score, (_h !== null && _h !== void 0 ? _h : \" \")), (_k = (_j = nextPlayer) === null || _j === void 0 ? void 0 : _j.name, (_k !== null && _k !== void 0 ? _k : \" \")), (_m = (_l = nextPlayer) === null || _l === void 0 ? void 0 : _l.score, (_m !== null && _m !== void 0 ? _m : \" \")));\r\n            }\r\n            str += `${table.toString()}\\n`;\r\n        }\r\n        if (specs.length) {\r\n            str += `Specs: ${specs.map(spec => spec.name).join(\", \")}\\n`;\r\n        }\r\n        str += \"```\";\r\n        return str;\r\n    }\r\n}\r\nexports.WfCommand = WfCommand;\r\n\n\n//# sourceURL=webpack:///./src/commands/warfork/wfinfo.ts?");

/***/ }),

/***/ "./src/commands/warfork/wflist.ts":
/*!****************************************!*\
  !*** ./src/commands/warfork/wflist.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n// Thanks, MSC\r\n// https://github.com/DenMSC\r\n// https://slice.sh/warsow/oldwiki/QueryProtocols.html\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Commando = __importStar(__webpack_require__(/*! discord.js-commando */ \"discord.js-commando\"));\r\nconst dgram = __importStar(__webpack_require__(/*! dgram */ \"dgram\"));\r\nconst dns = __importStar(__webpack_require__(/*! dns */ \"dns\"));\r\nconst ascii_table_1 = __importDefault(__webpack_require__(/*! ascii-table */ \"ascii-table\"));\r\nconst OOB_PADDING = '\\xFF\\xFF\\xFF\\xFF';\r\nconst REQUESTINFO = OOB_PADDING + 'getstatus';\r\nconst REQUESTHEADER = OOB_PADDING + 'statusResponse\\n\\\\';\r\nclass WfListCommand extends Commando.Command {\r\n    constructor(client) {\r\n        super(client, {\r\n            name: \"wflist\",\r\n            group: \"warfork\",\r\n            memberName: \"wflist\",\r\n            description: \"Gets list of server\",\r\n            examples: [\"wflist\"]\r\n        });\r\n    }\r\n    run(msg, { server, port }) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const masterServerIp = yield this.getIp(\"dpmaster.deathmask.net\");\r\n            const servers = yield this.getServers(masterServerIp);\r\n            const serverInfos = [];\r\n            for (const server of servers) {\r\n                const serverInfo = yield this.getServerInfo(server.ip, server.port);\r\n                serverInfos.push(serverInfo);\r\n            }\r\n            const str = this.formatServerList(serverInfos);\r\n            return msg.say(str);\r\n        });\r\n    }\r\n    getIp(hostname) {\r\n        return new Promise(resolve => {\r\n            dns.lookup(hostname, { family: 4 }, (err, res) => {\r\n                if (err) {\r\n                    resolve(null);\r\n                }\r\n                else {\r\n                    resolve(res);\r\n                }\r\n            });\r\n        });\r\n    }\r\n    getServers(masterIp, port = 27950) {\r\n        return new Promise(resolve => {\r\n            const socket = dgram.createSocket(\"udp4\");\r\n            const message = Buffer.from(`${OOB_PADDING}getservers Warfork 22 full`, \"ascii\");\r\n            socket.send(message, 0, message.length, port, masterIp);\r\n            socket.on(\"message\", (msg, rinfo) => {\r\n                socket.close();\r\n                let index = (OOB_PADDING + 'getserversResponse').length;\r\n                const servers = [];\r\n                while (index < msg.length) {\r\n                    const typeToken = msg.toString('ascii', index++, index);\r\n                    if (msg.toString('ascii', index, index + 3) == \"EOT\") {\r\n                        break;\r\n                    }\r\n                    let ip = '';\r\n                    let family;\r\n                    if (typeToken === \"\\\\\") {\r\n                        family = 'udp4';\r\n                        ip = Array(4).fill(0).map(() => {\r\n                            const part = msg.readUInt8(index);\r\n                            index += 1;\r\n                            return part;\r\n                        }).join('.');\r\n                    }\r\n                    const port = msg.readUInt16BE(index);\r\n                    index += 2;\r\n                    servers.push({ ip, port });\r\n                }\r\n                resolve(servers);\r\n            });\r\n        });\r\n    }\r\n    getServerInfo(server, port) {\r\n        return new Promise(resolve => {\r\n            const socket = dgram.createSocket(\"udp4\");\r\n            const message = Buffer.from(REQUESTINFO, \"ascii\");\r\n            socket.send(message, 0, message.length, port, server);\r\n            const timeout = setTimeout(() => {\r\n                clearTimeout(timeout);\r\n                resolve();\r\n            }, 2000);\r\n            socket.on(\"error\", (err) => {\r\n                clearTimeout(timeout);\r\n                resolve();\r\n            });\r\n            socket.on(\"message\", (res, rinfo) => {\r\n                socket.close();\r\n                const msg = res.toString(\"ascii\", REQUESTHEADER.length);\r\n                const serverInfo = this.parseResponse(msg, rinfo.address, rinfo.port);\r\n                clearTimeout(timeout);\r\n                resolve(serverInfo);\r\n            });\r\n        });\r\n    }\r\n    parseResponse(msg, ip, port) {\r\n        var _a, _b;\r\n        const parts = msg.split(\"\\n\");\r\n        const infoParts = parts.shift().split(\"\\\\\");\r\n        parts.pop();\r\n        const clientParts = parts;\r\n        const rawServerInfo = {};\r\n        for (let i = 0; i < infoParts.length; i += 2) {\r\n            rawServerInfo[infoParts[i]] = infoParts[i + 1];\r\n        }\r\n        const scores = (_b = (_a = rawServerInfo.g_match_score.split(\"FORBIDDEN: \")[1]) === null || _a === void 0 ? void 0 : _a.split(\" ICY: \").map(x => parseInt(x)), (_b !== null && _b !== void 0 ? _b : null));\r\n        return {\r\n            ip,\r\n            port,\r\n            title: JSON.stringify(rawServerInfo.sv_hostname).replace(/\\\"|\\^\\d|e\\\\b.*/g, \"\"),\r\n            version: rawServerInfo.version,\r\n            isPrivate: rawServerInfo.g_needpass === \"1\",\r\n            isInstagib: rawServerInfo.g_instagib === \"1\",\r\n            isRace: rawServerInfo.g_race_gametype === \"1\",\r\n            gametime: rawServerInfo.g_match_time,\r\n            maxClients: parseInt(rawServerInfo.sv_maxclients),\r\n            gametype: rawServerInfo.gametype,\r\n            map: rawServerInfo.mapname,\r\n            score: scores ? { alpha: scores[0], beta: scores[1] } : null,\r\n            clients: clientParts.map(str => {\r\n                const parts = str.match(/(?:[^\\s\"]+|\"[^\"]*\")+/g);\r\n                return {\r\n                    score: parseInt(parts[0]),\r\n                    ping: parseInt(parts[1]),\r\n                    name: parts[2].replace(/\\\"|\\^\\d/g, \"\"),\r\n                    team: parseInt(parts[3]),\r\n                    isSpec: parts[0] === \"-9999\"\r\n                };\r\n            })\r\n        };\r\n    }\r\n    formatServerList(servers) {\r\n        servers.sort((a, b) => b.clients.length - a.clients.length);\r\n        if (servers.length === 0) {\r\n            return \"All servers are empty\";\r\n        }\r\n        let str = \"```\\n\";\r\n        const table = new ascii_table_1.default();\r\n        table.setHeading(\"Title\", \"Players\", \"Gametype\", \"Map\", \"IP:Port\");\r\n        for (const server of servers) {\r\n            if (!server) {\r\n                continue;\r\n            }\r\n            table.addRow(`${server.title.normalize(\"NFC\")} ${server.isPrivate ? \"🔒\" : \"\"}`, `${server.clients.length} / ${server.maxClients}`, server.gametype, server.map, `${server.ip}:${server.port}`);\r\n        }\r\n        str += `${table.toString()}`;\r\n        str += \"```\";\r\n        return str;\r\n    }\r\n}\r\nexports.WfListCommand = WfListCommand;\r\n\n\n//# sourceURL=webpack:///./src/commands/warfork/wflist.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nconst discord_js_commando_1 = __webpack_require__(/*! discord.js-commando */ \"discord.js-commando\");\r\nconst config_json_1 = __importDefault(__webpack_require__(/*! ../config.json */ \"./config.json\"));\r\nconst timer_1 = __webpack_require__(/*! ./commands/misc/timer */ \"./src/commands/misc/timer.ts\");\r\nconst roll_1 = __webpack_require__(/*! ./commands/misc/roll */ \"./src/commands/misc/roll.ts\");\r\nconst timernotify_1 = __webpack_require__(/*! ./commands/misc/timernotify */ \"./src/commands/misc/timernotify.ts\");\r\nconst cleartimer_1 = __webpack_require__(/*! ./commands/misc/cleartimer */ \"./src/commands/misc/cleartimer.ts\");\r\nconst sound_1 = __webpack_require__(/*! ./commands/misc/sound */ \"./src/commands/misc/sound.ts\");\r\nconst sounds_1 = __webpack_require__(/*! ./commands/misc/sounds */ \"./src/commands/misc/sounds.ts\");\r\nconst wfinfo_1 = __webpack_require__(/*! ./commands/warfork/wfinfo */ \"./src/commands/warfork/wfinfo.ts\");\r\nconst wflist_1 = __webpack_require__(/*! ./commands/warfork/wflist */ \"./src/commands/warfork/wflist.ts\");\r\nconst jazbot = new discord_js_commando_1.CommandoClient({\r\n    commandPrefix: \"$\",\r\n    owner: \"147075197378232320\",\r\n    unknownCommandResponse: false,\r\n    nonCommandEditable: true\r\n});\r\nif (!fs.existsSync(\"store.json\")) {\r\n    const store = { timers: {}, notified: [], notify: [], notified6h: [] };\r\n    console.log(\"writing new file\");\r\n    fs.writeFileSync(\"store.json\", JSON.stringify(store, null, \"\\t\"), { encoding: \"utf8\" });\r\n}\r\njazbot.registry\r\n    .registerGroups([\r\n    ['misc', 'Various commands'],\r\n    [\"warfork\", \"Warfork commands\"]\r\n])\r\n    .registerDefaults()\r\n    .registerCommands([timer_1.TimerCommand, timernotify_1.TimerNotifyCommand, cleartimer_1.ClearTimerCommand, roll_1.RollCommand, sound_1.SoundCommand, sounds_1.SoundsCommand, wfinfo_1.WfCommand, wflist_1.WfListCommand]);\r\njazbot.on(\"ready\", () => {\r\n    console.log(\"Jazbot is ready!\");\r\n});\r\njazbot.on(\"error\", (err) => {\r\n    console.log(err);\r\n});\r\njazbot.login(config_json_1.default.key);\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "ascii-table":
/*!******************************!*\
  !*** external "ascii-table" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ascii-table\");\n\n//# sourceURL=webpack:///external_%22ascii-table%22?");

/***/ }),

/***/ "dgram":
/*!************************!*\
  !*** external "dgram" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dgram\");\n\n//# sourceURL=webpack:///external_%22dgram%22?");

/***/ }),

/***/ "discord.js-commando":
/*!**************************************!*\
  !*** external "discord.js-commando" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"discord.js-commando\");\n\n//# sourceURL=webpack:///external_%22discord.js-commando%22?");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dns\");\n\n//# sourceURL=webpack:///external_%22dns%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "humanize-duration":
/*!************************************!*\
  !*** external "humanize-duration" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"humanize-duration\");\n\n//# sourceURL=webpack:///external_%22humanize-duration%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "timestring":
/*!*****************************!*\
  !*** external "timestring" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"timestring\");\n\n//# sourceURL=webpack:///external_%22timestring%22?");

/***/ })

/******/ });