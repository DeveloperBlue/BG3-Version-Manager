// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Version } from '../shared_types/VersionTypes';
import { ApplicationSettings, BaldursGateDirectoryVerification, SteamCMDStatus } from '@shared_types/IPC';

export type Channels = 'ipc-example';

const electronHandler = {
	ipcRenderer: {
		sendMessage(channel: Channels, ...args: unknown[]) {
			ipcRenderer.send(channel, ...args);
		},
		on(channel: Channels, func: (...args: unknown[]) => void) {
			const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
				func(...args);
			ipcRenderer.on(channel, subscription);

			return () => {
				ipcRenderer.removeListener(channel, subscription);
			};
		},
		once(channel: Channels, func: (...args: unknown[]) => void) {
			ipcRenderer.once(channel, (_event, ...args) => func(...args));
		},

		/* */

		getApplicationSettings() {
			return ipcRenderer.invoke('getApplicationSettings') as Promise<ApplicationSettings>;
		},

		setApplicationSettings(applicationSettings: ApplicationSettings) {
			return ipcRenderer.send("setApplicationSettings", applicationSettings)
		},

		onApplicationSettingsUpdate(func: (applicationSettings: ApplicationSettings) => void) {

			const subscription = (_event: IpcRendererEvent, applicationSettings: ApplicationSettings) =>
				func(applicationSettings);

			ipcRenderer.on("applicationSettingsUpdated", subscription)

			return () => {
				ipcRenderer.removeListener("applicationSettingsUpdated", subscription);
			};

		},

		passSetupConfig(setupConfig: ApplicationSettings) {
			return ipcRenderer.invoke("passSetupConfig", setupConfig) as Promise<boolean>
		},

		onSteamCMDStatusUpdate(func: (status : SteamCMDStatus) => void) {

			const subscription = (_event: IpcRendererEvent, status : SteamCMDStatus) =>
				func(status);

			ipcRenderer.on("steamCMDStatusUpdate", subscription)

			return () => {
				ipcRenderer.removeListener("steamCMDStatusUpdate", subscription);
			};

		},

		/* */

		autodetectBaldursGateInstall() {

			return ipcRenderer.invoke('audodetectBaldursGateInstall') as Promise<{found : false} | {found : true, path : string}>

		},

		requestBaldursGateDirectoryDialog() {

			return ipcRenderer.invoke("requestBaldursGateDirectoryDialog") as Promise<{found : false} | {found : true, path : string, checks : BaldursGateDirectoryVerification}>

		},

		verifyBaldursGateDirectory(directory : string) {

			return ipcRenderer.invoke("verifyBaldursGateDirectory", {directory}) as Promise<BaldursGateDirectoryVerification>

		},

		/* */

		getWikiVersions() {

			return ipcRenderer.invoke('getWikiVersions') as Promise<Version[]>

		},

		initSteamCMD() {
			ipcRenderer.send("initSteamCMD")
		},

		checkSteamCMD() {
			return ipcRenderer.invoke('checkSteamCMD') as Promise<SteamCMDStatus>
		}
	},
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
