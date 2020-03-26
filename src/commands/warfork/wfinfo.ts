// Thanks, MSC
// https://github.com/DenMSC
// https://slice.sh/warsow/oldwiki/QueryProtocols.html

import * as Commando from 'discord.js-commando';

import * as dgram from "dgram";

import { Message } from 'discord.js';
import AsciiTable from "ascii-table";
import {ServerInfo, Client, Team} from "./types";

const OOB_PADDING = '\xFF\xFF\xFF\xFF';

const REQUESTINFO = OOB_PADDING + 'getstatus';
const REQUESTHEADER = OOB_PADDING + 'statusResponse\n\\';

export class WfCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: "wfinfo",
            group: "warfork",
            memberName: "wfinfo",
            description: "Get server info",
            examples: ["wfinfo jazcash.com"],
            args: [
                {
                    key: "server",
                    prompt: "Hostname or IP",
                    type: "string"
                },
                {
                    key: "port",
                    prompt: "Server port. Usually either 27950 or 44400 for Warsow/Warfork",
                    type: "integer",
                    default: 44400
                }
            ]
        });
    }

    public async run(msg: Commando.CommandMessage, { server, port }: { server: string; port: number }): Promise<Message | Message[]> {
        if (server.includes(":")){
            port = parseInt(server.split(":")[1]);
            server = server.split(":")[0];
        }

        const info = await this.getInfo(server, port);

        if (info){
            return msg.say(this.formatServerInfo(info));
        } else {
            return msg.say("There was an error querying that server");
        }
    }

    protected getInfo(server: string, port: number): Promise<ServerInfo> {
        return new Promise(resolve => {
            const socket = dgram.createSocket("udp4");

            const message = Buffer.from(REQUESTINFO, "ascii");

            socket.send(message, 0, message.length, port, server);

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                resolve();
            }, 2000);

            socket.on("error", (err) => {
                clearTimeout(timeout);
                resolve();
            });

            socket.on("message", (res, rinfo) => {
                socket.close();

                const msg = res.toString("ascii", REQUESTHEADER.length);

                const serverInfo = this.parseResponse(msg, rinfo.address, rinfo.port);

                clearTimeout(timeout);
                resolve(serverInfo);
            });
        });
    }

    protected parseResponse(msg: string, ip: string, port: number): ServerInfo {
        const parts = msg.split("\n");

        const infoParts = parts.shift()!.split("\\");
        parts.pop();
        const clientParts = parts;

        const rawServerInfo: { [key: string]: string } = {};
        for (let i = 0; i < infoParts.length; i += 2) {
            rawServerInfo[infoParts[i]] = infoParts[i + 1];
        }

        const scores = rawServerInfo.g_match_score.split("FORBIDDEN: ")[1]?.split(" ICY: ").map(x => parseInt(x)) ?? null;

        return {
            ip,
            port,
            title: JSON.stringify(rawServerInfo.sv_hostname).replace(/\"|\^\d|e\\b.*/g, ""),
            version: rawServerInfo.version,
            isPrivate: rawServerInfo.g_neepass === "1",
            isInstagib: rawServerInfo.g_instagib === "1",
            isRace: rawServerInfo.g_race_gametype === "1",
            gametime: rawServerInfo.g_match_time,
            maxClients: parseInt(rawServerInfo.sv_maxclients),
            gametype: rawServerInfo.gametype,
            map: rawServerInfo.mapname,
            score: scores ? { alpha: scores[0], beta: scores[1] } : null,
            clients: clientParts.map(str => {
                const parts = str.match(/(?:[^\s"]+|"[^"]*")+/g)!;

                return {
                    score: parseInt(parts[0]),
                    ping: parseInt(parts[1]),
                    name: parts[2].replace(/\"|\^\d/g, ""),
                    team: parseInt(parts[3]),
                    isSpec: parts[0] === "-9999"
                } as Client;
            })
        }
    }

    protected formatServerInfo(info: ServerInfo): string{
        let str = "```\n";

        str += `${info.title} - ${info.gametype} - ${info.clients.length}/${info.maxClients} - ${info.map} - ${info.ip}:${info.port}\n`;

        const players = info.clients.filter(client => !client.isSpec);
        const specs = info.clients.filter(client => client.isSpec);

        if (players.length){
            const table = new AsciiTable();

            table.setHeading("Alpha", info.score?.alpha ?? 0, "Beta", info.score?.beta ?? 0);

            const alpha = players.filter(player => player.team === Team.ALPHA).sort((a, b) => b.score - a.score);
            const beta = players.filter(player => player.team === Team.BETA).sort((a, b) => b.score - a.score);

            for (let i=0; i<Math.max(alpha.length, beta.length); i++){
                const player = alpha[i];
                const nextPlayer = beta[i];

                table.addRow(player?.name ?? " ", player?.score ?? " ", nextPlayer?.name ?? " ", nextPlayer?.score ?? " ");
            }

            str += `${table.toString()}\n`;
        }

        if (specs.length){
            str += `Specs: ${specs.map(spec => spec.name).join(", ")}\n`;
        }

        str += "```";

        return str;
    }
}