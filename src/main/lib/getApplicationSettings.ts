import fs from 'fs';
import path from 'path';

import { app, ipcMain } from 'electron';
import { ApplicationSettings } from '@shared_types/IPC';

const configFilePath = path.join(app.getAppPath(), "/settings.json")

let config : ApplicationSettings = {
	steamInstallationDir : "",
	versionsInstallationDir : path.join(app.getAppPath(), "Versions"),
	setup : true
};


if (fs.existsSync(configFilePath)) {

	/* Settings exist, load them */

	try {

		const settingsJSON_Raw = fs.readFileSync(configFilePath, "utf-8");
		const settingsJSON = JSON.parse(settingsJSON_Raw) as ApplicationSettings;

		config = {...settingsJSON};

	} catch (e) {

		console.log("[WARN] Failed to extract current application settings!");

	}
}

function getApplicationSettings() {

	return config;

}

function saveApplicationSettings() {

	try {
		fs.writeFileSync(configFilePath, JSON.stringify(config, null, '\t'));
	} catch (e) {
		console.log("[WARN] Failed to update application settings!")
	}
}

ipcMain.on('saveApplicationSettings', async (event, args) => {

	saveApplicationSettings();

})

ipcMain.on('setApplicationSettings', async (event, args) => {

})

ipcMain.handle('passSetupConfig', async (event, setupConfig : ApplicationSettings) => {

	return new Promise((resolve, reject) => {

		const {
			steamInstallationDir,
			versionsInstallationDir,
			setup
		} = setupConfig;

		config.steamInstallationDir = steamInstallationDir;
		config.versionsInstallationDir = versionsInstallationDir;
		config.setup = setup;

		saveApplicationSettings();

		resolve(true);

	})

});

ipcMain.handle('getApplicationSettings', async (event, args) => {

	const applicationSettings = getApplicationSettings();

	return applicationSettings;

});

export { config }

// Request from Provider
