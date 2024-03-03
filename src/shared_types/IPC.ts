export type ApplicationSettings = {
	steamInstallationDir : string,
	versionsInstallationDir : string,
	setup : boolean
}

export type BaldursGateDirectoryVerification = {
	includesBG3Name : boolean,
	hasGameFolders : boolean,
	isNotFromVersionManager : boolean,
	passed : boolean
}

export type SteamCMDStatus = 'NONE' | 'Downloading' | 'Extracting' | 'Installing' | 'Ready'
