type initProps = {
    binDir? : string,
    installDir? : string,
    username? : string,
    enableDebugLogging? : string
}

declare module 'steamcmd-interface' {

    export class SteamCmd {

		// @ts-ignore
        static async init(initProps) : Promise<SteamCmd>

		// @ts-ignore
        async login(username : string, password? : string, steamGuardCode? : string) : Promise<void>

		// @ts-ignore
        *run(commands : string[], options? : {noAutoLogin? : boolean})
    }

}
