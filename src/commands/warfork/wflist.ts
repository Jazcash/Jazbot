// Thanks, MSC
// https://github.com/DenMSC
// https://slice.sh/warsow/oldwiki/QueryProtocols.html

import * as Commando from 'discord.js-commando';

import * as dgram from "dgram";
import * as dns from "dns";
import { Message } from 'discord.js';
import AsciiTable from "ascii-table";
import {ServerInfo, Client} from "./types";

const OOB_PADDING = '\xFF\xFF\xFF\xFF';

const REQUESTINFO = OOB_PADDING + 'getstatus';
const REQUESTHEADER = OOB_PADDING + 'statusResponse\n\\';

interface HostPort {
    ip: string;
    port: number;
}

export class WfListCommand extends Commando.Command {
    constructor(client: Commando.CommandoClient) {
        super(client, {
            name: "wflist",
            group: "warfork",
            memberName: "wflist",
            description: "Gets a list of Warfork servers",
            examples: ["wflist"]
        });
    }

    public async run(msg: Commando.CommandMessage, { server, port }: { server: string; port: number }): Promise<Message | Message[]> {
        const masterServerIp = await this.getIp("dpmaster.deathmask.net");
        const servers = await this.getServers(masterServerIp);

        const serverInfos: ServerInfo[] = [];
        for (const server of servers){
            const serverInfo = await this.getServerInfo(server.ip, server.port);
            serverInfos.push(serverInfo);
        }

        const str = this.formatServerList(serverInfos);

        console.log(str);

        return msg.say(str);
    }

    private getIp(hostname: string): Promise<string | null>{
        return new Promise(resolve => {
            dns.lookup(hostname, { family: 4 }, (err, res) => {
                if (err){
                    resolve(null);
                } else {
                    resolve(res);
                }
            });
        });
    }

    private getServers(masterIp: string, port = 27950): Promise<HostPort[]>{
        return new Promise(resolve => {
            const socket = dgram.createSocket("udp4");

            const message = Buffer.from(`${OOB_PADDING}getservers Warfork 22 full`, "ascii");

            socket.send(message, 0, message.length, port, masterIp);

            socket.on("message", (msg, rinfo) => {
                socket.close();

                let index = (OOB_PADDING + 'getserversResponse').length;

                const servers: HostPort[] = [];

                while (index < msg.length) {
                    const typeToken = msg.toString('ascii', index++, index);

                    if (msg.toString('ascii', index, index + 3) == "EOT") {
                        break;
                    }

                    let ip = '';
                    let family;

                    if (typeToken === "\\") {
                        family = 'udp4';
                        ip = Array(4).fill(0).map(() => {
                            const part = msg.readUInt8(index);
                            index += 1;
                            return part;
                        }).join('.');
                    }

                    const port = msg.readUInt16BE(index);
                    index += 2;

                    servers.push({ip, port});
                }

                resolve(servers);
            });
        });
    }

    private getServerInfo(server: string, port: number): Promise<ServerInfo> {
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

    private parseResponse(msg: string, ip: string, port: number): ServerInfo {
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
            title: JSON.stringify(rawServerInfo.sv_hostname).replace(/\"|\^\d|\\u.*/g, ""),
            version: rawServerInfo.version,
            isPrivate: rawServerInfo.g_needpass === "1",
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

    private formatServerList(servers: ServerInfo[]): string{
        servers.sort((a, b) => b.clients.length - a.clients.length);

        if (servers.length === 0){
            return "All servers are empty";
        }

        let str = "```\n";

        const table = new AsciiTable();

        table.setHeading("Title", "Players", "Gametype", "Map", "IP:Port");

        for (const server of servers){
            if (!server){
                continue;
            }

            table.addRow(`${server.title.normalize("NFC")} ${server.isPrivate ? "🔒" : ""}`, `${server.clients.length} / ${server.maxClients}`, server.gametype, server.map, `${server.ip}:${server.port}`);
        }

        str += `${table.toString()}`;

        str += "```";

        return str;
    }
}