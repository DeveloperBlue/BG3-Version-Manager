import fs from 'node:fs';
import path from 'node:path';
import * as os from 'node:os';
import https from 'https'
import {spawn} from 'child_process';

const platform = os.platform();

import { instance } from './SteamCMD'

export function install({installDir = "", forceReinstall} : {installDir : string, forceReinstall? : boolean}) {

	return new Promise((resolve, reject) => {

		instance.setStatus('Downloading')

		/* Check if SteamCMD directory already exists */
		/* If it already exists and forceReinstall is true, delete the folder */

		console.log("Install Dir", installDir);


		if (fs.existsSync(installDir)) {
			if (forceReinstall) {
				try {
					fs.rmdirSync(installDir);
				} catch (e) {
					console.log("Failed to remove existing SteamCMD directory for force-reinstall", installDir, e);
					reject(e);
				}
			} else {
				instance.setStatus('Ready')
				return resolve(true);
			}
		}

		/* Download and unzip the appropriate archive for the OS */

		try {
			fs.mkdirSync(installDir);
			console.log("Created SteamCMD Install Dir", installDir);
		} catch (e) {
			console.log("Failed to make SteamCMD directory", installDir, e);
			reject();
			return;
		}

		console.log("Downloading SteamCMD for OS", platform);

		switch (platform) {
			/* Windows */
			case 'win32' : {
				https.get('https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip', (res) => {

					if (res.statusCode !== 200) {
						console.log("Failed to get archive from Windows SteamCMD CDN", res.statusCode)
						reject(`Failed to get archive from SteamCMD CDN [Status: ${res.statusCode}]`)
						return;
					}

					const archivePath = path.join(installDir, 'steamcmd.zip')

					res.pipe(fs.createWriteStream(archivePath));
					res.on('end', () => {
						console.log('Downloaded SteamCMD for windows')
						//Extract downloaded archive
						instance.setStatus('Extracting')
						spawn('PowerShell', ['-Command', 'Expand-Archive -Path "' + archivePath + '" -Destination "' + installDir + '"'])
						.on('exit', () => {
							if(!fs.existsSync(path.join(installDir, 'steamcmd.exe'))){
								console.error('Failed to extract SteamCMD');
								reject();
								return process.exit(1);
							}
							instance.setStatus('Installing')

							instance.setStatus('Ready')
							console.log('SteamCMD extracted successfully')
						})
					})
				})
				break;
			}
			/* MacOS */
			case 'darwin' : {
				https.get('https://steamcdn-a.akamaihd.net/client/installer/steamcmd_osx.tar.gz', (res) => {

					if (res.statusCode !== 200) {
						console.log("Failed to get archive from MacOS SteamCMD CDN", res.statusCode)
						reject(`Failed to get archive from SteamCMD CDN [Status: ${res.statusCode}]`)
						return;
					}

					const archivePath = path.join(installDir, 'steamcmd_osx.tar.gz')

					res.pipe(fs.createWriteStream(archivePath));
					res.on('end', () => {
						console.log('Downloaded SteamCMD for darwin')
						instance.setStatus('Extracting')
						spawn('tar', ['-xzvf', archivePath, '-C', installDir])
						.on('exit', () => {
							if(!fs.existsSync(path.join(installDir, 'steamcmd.sh'))){
								console.error('Failed to extract SteamCMD')
								reject();
								return process.exit(1);
							}
							instance.setStatus('Installing')

							instance.setStatus('Ready')
							console.log('SteamCMD extracted successfully')
						})
					})
				})
				break;
			}
			/* Linux */
			case 'linux' : {
				https.get('https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz', (res) => {

					if (res.statusCode !== 200) {
						console.log("Failed to get archive from Linux SteamCMD CDN", res.statusCode)
						reject(`Failed to get archive from SteamCMD CDN [Status: ${res.statusCode}]`)
						return;
					}

					const archivePath = path.join(installDir, 'steamcmd_linux.tar.gz')

					res.pipe(fs.createWriteStream(archivePath));
					res.on('end', () => {
						console.log('Downloaded SteamCMD for linux')
						instance.setStatus('Extracting')
						spawn('tar', ['-xzvf', archivePath, '-C', installDir])
						.on('exit', () => {
							if(!fs.existsSync(path.join(installDir + 'steamcmd.sh'))){
								console.error('Failed to extract SteamCMD');
								reject();
								return process.exit(1);
							}
							instance.setStatus('Installing')

							instance.setStatus('Ready')
							console.log('SteamCMD extracted successfully')
						})
					})
				})
				break;
			}
			default : {
				console.log("Unsupported platform", platform);
				reject(`Unsupported platform [os: ${platform}]`);
				break;
			}
		}

		/* Do a quick login anonymous + quit to create the initial files */

	})


}

