import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { InstalledVersion, SidebarKey, Version } from '../../../shared_types/VersionTypes'
import { ApplicationSettings, SteamCMDStatus } from '@shared_types/IPC'

// Define a type for the slice state
interface AppState {

	sidebarActiveState : SidebarKey,

	downloadInProgress : boolean,

	versions : Version[],
	installedVersions : {[key : string] : InstalledVersion},
	currentVersion : null | string,

	settings : ApplicationSettings

	setupTab : {
		steamInstallationDir : string,
		versionsInstallationDir : string
	},

	steamCMD : {
		status : SteamCMDStatus
	},

	steamModal : {
		isActive : boolean,
		version : InstalledVersion | null
	}

}



// Define the initial state using that type
const initialState: AppState = {

	sidebarActiveState : 'Home',

	downloadInProgress : false,

	versions : [],
	installedVersions : {},
	currentVersion : null,

	settings : {
		steamInstallationDir : "",
		versionsInstallationDir : "",
		setup : true
	},

	setupTab : {
		steamInstallationDir : "",
		versionsInstallationDir : ""
	},

	steamCMD : {
		status : 'NONE'
	},

	steamModal : {
		isActive : false,
		version : null
	}

}

export const appSlice = createSlice({
	name: 'app',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {

		setApplicationSettings : (state, action : PayloadAction<ApplicationSettings>) => {
			state.settings = action.payload;
			if (state.settings.setup) {

				state.setupTab.steamInstallationDir = action.payload.steamInstallationDir;
				state.setupTab.versionsInstallationDir = action.payload.versionsInstallationDir;

			}
		},

		setSetupTabDirectory : (state, action : PayloadAction<{key : keyof AppState['setupTab'], directory : string}>) => {
			state.setupTab[action.payload.key] = action.payload.directory;
		},

		setSidebarActiveState : (state, action : PayloadAction<SidebarKey>) => {
			state.sidebarActiveState = action.payload;
		},

		setDownloadInProgress : (state, action : PayloadAction<boolean>) => {
			state.downloadInProgress = action.payload;
		},

		setVersions : (state, action : PayloadAction<Version[]>) => {
			state.versions = action.payload;
		},
		setInstalledVersions : (state, action : PayloadAction<{[key : string] : InstalledVersion}>) => {
			state.installedVersions = action.payload;
		},
		setCurrentVersion : (state, action : PayloadAction<string>) => {
			state.currentVersion = action.payload;
		},

		setVersionsDirectory : (state, action : PayloadAction<string>) => {
			state.settings.versionsInstallationDir = action.payload;
		},

		// setSteamCMDDirectory : (state, action : PayloadAction<string>) => {
		// 	state.settings.versionsInstallationPath = action.payload;
		// },

		setSteamGameDirectory : (state, action : PayloadAction<string>) => {
			state.settings.steamInstallationDir = action.payload;
		},

		setSteamModalActive : (state, action : PayloadAction<{active : false} | {active : true, version : InstalledVersion}>) => {
			state.steamModal = {
				isActive : action.payload.active,
				version : (action.payload.active === true) ? action.payload.version : null
			}
		},

		setSteamCMDStatus : (state, action : PayloadAction<SteamCMDStatus>) => {
			state.steamCMD.status = action.payload;
		}

	},
})

export const {

	setApplicationSettings,

	setSetupTabDirectory,

	setSidebarActiveState,

	setDownloadInProgress,

	setVersions,
	setInstalledVersions,
	setCurrentVersion,

	setVersionsDirectory,
	// setSteamCMDDirectory,
	setSteamGameDirectory,

	setSteamModalActive,

	setSteamCMDStatus

} = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getApplicationSettings = (state : RootState) => state.app.settings;

export const getSidebarActiveState = (state : RootState) => state.app.sidebarActiveState;

export const getIsDownloadInProgress = (state : RootState) => state.app.downloadInProgress;

export const getAllVersions = (state : RootState) => state.app.versions;
export const getInstalledVersions = (state : RootState) => state.app.installedVersions;
export const getCurrentVersion = (state : RootState) => state.app.currentVersion;

export const getSetupTabDirectories = (state : RootState) => state.app.setupTab;

export const getSteamModalData = (state : RootState) => state.app.steamModal;

export const getSteamCMDStatus = (state : RootState) => state.app.steamCMD.status;

export default appSlice.reducer
