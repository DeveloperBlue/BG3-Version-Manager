import * as os from 'node:os';
import * as pty from '@homebridge/node-pty-prebuilt-multiarch'
import path from 'path';
import fs from 'fs';

import { ipcMain, ipcRenderer } from 'electron'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

import { install } from './install'
import { run } from './run'
import { SteamCMDStatus } from '@shared_types/IPC';
import { mainWindow } from '../../main';
import { config } from '../getApplicationSettings';
import { fstat } from 'node:fs';

class SteamCMD {

	public static instance : SteamCMD;
	public status : SteamCMDStatus = 'NONE';

	constructor() {
		if (SteamCMD.instance) return;
		SteamCMD.instance = this;
		console.log("SteamCMD creted");
		return SteamCMD.instance;
	}

	install = install

	run (args : string[]) {
		run("", args)
	}

	setStatus(status : SteamCMDStatus) {
		console.log("Setting SteamCMD Status", status);
		this.status = status;
		if (mainWindow) {
			mainWindow.webContents.send("steamCMDStatusUpdate", status);
		}
	}

	isInstalled() {

	}

}

const instance = new SteamCMD();

function resolveInstallationDirectory() {
	// TODO
	// Ensure the config directory is set/valid

	if (fs.existsSync(config.versionsInstallationDir) == false){
		fs.mkdirSync(config.versionsInstallationDir);
	}

	return path.join(config.versionsInstallationDir, "SteamCMD")
}

ipcMain.on('initSteamCMD', async () => {

	console.log("ipc received init steamcmd")

	const installDir = resolveInstallationDirectory();

	console.log("InstallDir", installDir);

	instance.install({installDir});

})

ipcMain.handle('checkSteamCMD', () => {

	return new Promise<SteamCMDStatus>((resolve, reject) => {


		resolve(instance.status);

	})

})

export {instance};
