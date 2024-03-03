import { BaldursGateDirectoryVerification } from '@shared_types/IPC';
import { ipcMain, dialog } from 'electron'

import fs from 'fs'
import path from 'path'

ipcMain.handle('audodetectBaldursGateInstall', async (event, args) => {

});

function verifyBaldursGateDirectory(directory : string) {

	// return (check0 && check1 && check2 && check3 && check4);

	return new Promise((resolve, reject) => {

		/*
			Battery of checks to ensure this is the correct folder
		*/

		/* Loose check to see if this is the "Baldurs Gate 3" folder - Also works if the folder has been renamed to "Baldurs Gate 3 - Steam"*/
		const check0 = (directory.toLowerCase().includes("baldurs gate 3"))

		/* Ensure the appropriate folders are within this directory */

		// TODO
		// These folders might be different on MacOS and Linux!

		const check1 = fs.existsSync(path.join(directory, "/bin"))
		const check2 = fs.existsSync(path.join(directory, "/Data"))
		const check3 = fs.existsSync(path.join(directory, "/Launcher"))

		/* Ensure we're not picking a version that is from the BG3 Manager */

		const bg3VersionsPath = "";

		const check4 = (() => {
			const relative = path.relative(bg3VersionsPath, directory);
			const isSubdir = relative && !relative.startsWith('..') && !path.isAbsolute(relative);
			if (isSubdir) return false;
			return true;
		})()

		/* *** */

		const response : BaldursGateDirectoryVerification = {
			includesBG3Name : check0,
			hasGameFolders : check1 && check2 && check3,
			isNotFromVersionManager : check4,
			passed : check0 && check1 && check2 && check3 && check4
		}

		resolve(response)

	})

}

ipcMain.handle('requestBaldursGateDirectoryDialog', async (event, args) => {

	return new Promise((resolve, reject) => {

		dialog.showOpenDialog({
			properties : [
				'openDirectory'
			],
			message : "Baldurs Gate 3 Steam Installation"
		}).then(async (result) => {

			if (result.canceled) {
				resolve({ found : false });
			}

			const directory = result.filePaths[0];

			if (directory == null) {
				resolve({ found : false });
			}

			resolve({ found : true, path : directory, checks : await verifyBaldursGateDirectory(directory) });

		})

	})


})

ipcMain.handle('verifyBaldursGateDirectory', async (event, {directory} : {directory : string}) => {

	return verifyBaldursGateDirectory(directory)

})
