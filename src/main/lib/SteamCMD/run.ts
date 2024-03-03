import * as os from 'node:os';
import {spawn} from 'child_process';

const platform = os.platform();

export function run(steamCMDDir : string, args : string[]) {
    return new Promise((resolve, reject) => {
		let steamcmdExe;
		switch (platform) {
			case 'win32': steamcmdExe = steamCMDDir + 'steamcmd.exe'; break;
			case 'linux' || 'darwin': steamcmdExe = steamCMDDir + 'steamcmd.sh'; break;
		}
		console.log(steamcmdExe, [' +' + args]);
		let stringArgs = "";
		args.forEach(element => {
			stringArgs += ' +' + element;
		});
		const steamCmdShell = spawn(steamcmdExe + stringArgs);
		steamCmdShell.stdout.on('data', (data) => { console.log(data.toString()) });
		steamCmdShell.stderr.on('data', (data) => { console.error(data.toString()) });
		steamCmdShell.on('exit', (code) => {
			console.log('SteamCMD exited with code: ' + code);
			resolve(code)
		});
    });
}
