export interface ServerInfo {
    ip: string;
    port: number;
    title: string;
    version: string;
    isPrivate: boolean;
    isInstagib: boolean;
    isRace: boolean;
    maxClients: number;
    gametype: string;
    gametime: string;
    map: string;
    score: { alpha: number; beta: number } | null;
    clients: (Client | undefined)[];
}

export interface Client {
    name: string;
    isSpec: boolean;
    ping: number;
    score: number;
    team: Team;
}

export enum Team {
    ALPHA = 2,
    BETA = 3,
    SPEC = 0
}