
/* UI Related Types */
const SidebarKeys = ['Home', 'Steam', 'Version Manager', 'Settings'] as const;
type SidebarKey = typeof SidebarKeys[number]

export {SidebarKeys}
export type {SidebarKey}

/* Version Types */

type Version = {
	date : string,
	version : string,
	name : string
}

type VersionStatus = 'Installed' | 'Downloading' // Could also be 'Steam'

type InstalledVersion = Version & {
	status : VersionStatus,
	directories : {
		"Gustav Content" : "",
		"Gustav Content - Bin" : "",
		"Gustav Content - Launcher" : ""
	},
	steamOriginal? : true
}

export type {Version, VersionStatus, InstalledVersion};

