
import { useEffect } from 'react';


import './App.css';
import { Version } from '@shared_types/VersionTypes';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getApplicationSettings, getSidebarActiveState, setInstalledVersions, setVersions } from '@redux/slices/appSlice';
import SteamModal from '@components/SteamModal/SteamModal';
import Sidebar, { SidebarOptions } from '@components/Sidebar/Sidebar';

import SteamCMDProvider from '@components/SteamCMDProvider/SteamCMDProvider';
import SetupTab from '@tabs/Setup';

/*
	Setup page requires:
	- Install SteamCMD
	- Baldur's Gate 3 Steam Location
*/

/* */

/*
	SETUP TAB
	- First time setup tab
	- Installing SteamcMD
	- Selecting the BG3 default Steam Location

	HOME TAB
	- Recent launches / Installed Versions tabs
	- Steam launch tab
	- Download Progress
	- Little check to ensure all folder paths are fine

	STEAM TAB
	- Status on what version is linked to Steam
	- Auto update handler
	- Create Steam Shortcut (handles update disabler, launches Larian Launcher)

	VERSION MANAGER TAB
	- Verisons Installer
	- Download progress

	SETTINGS TAB
	- Folder paths
	- Reset Steam
	- Reset all settings?

	SETUP AND CHECK CURRENT INSTALLS
	User clicks to download a version
	installedVersions : [
		{
			state : "Downloading"
		}
	]
	Version is downloaded in steamcmd folder, renamed with _{VERSION} appended to end
	All manifests get a "bg3manager.inprogress" file to denote that they aren't done downloading
	All manifests get a 'bg3manager.version file to signify their version
	When all manifests are downloaded, and only then, a new folder is created in the Versions folder named Baldurs Gate 3 - VERSION
	Once this has been created, set state = "Installed"

*/

/*
	INSTRUCTIONS
	Note that this does not touch their save files
	They are responsible for version rollbacks. They should be careful when loading newer saves on older game versions.
	User finds their original BG3 install folder (or we auto-find it)
	User navigates to the Version Manager
	User downloads version they want
	User can launch that instance without steam, done
	User can "link with steam"
*/

function App() {

	const dispatch = useAppDispatch();

	/* Steam Modal */


	/*
		There should be a "Baldur's Gate 3" folder right above the SteamcMD installation
		This folder symlinks it's Data, bin, and Launcher folders (and localizations?)
		Setting the "Active" instance swaps the symlinks

		Launch standalone just launches the game (with a dropdown for the DX12 version?)
		Launch with Steam renames the steamapps folder to "Baldur's Gate 3 - Steam", symlinks to the Active folder, and launches with steam://{ID}

		A cleanup button that removes the symlinks and renames the original Steam version back to just "Baldur's Gate 3".
	*/

	/*
		Launch (Standalone) (?)*1
		Launch with Steam (EXPERIMENTAL) (?)*2 [X] Disable updates on launch (TEMPORARY)

		(?)*1 - Steam invites and achievements are disabled. To play multiplayer, the host needs to turn on "Direct Connections" in the lobby settings and set the session to "Public".
		(?)*2 - WARNING - Steam may update this version of the game on its own! Automatic updates will be DISABLED, but Steam may re-enable them at any time. This means if the game is set to "Always Up-To Date" or "Update on Launch", you may ruin this rolled back version!
	*/

	const { setup } = useAppSelector(getApplicationSettings);

	useEffect(() => {

		console.log("Getting latest versions");

		async function getWikiVersions() {

			console.log("Getting installed versions")

			const versions = await window.electron.ipcRenderer.getWikiVersions();

			dispatch(setVersions(versions))

		}

		getWikiVersions();

		dispatch(setInstalledVersions({
			'4.1.1.4811634' : {
				date : '2024-02-22',
				version : '4.1.1.4811634',
				name : 'Hotfix #19',
				status : 'Installed',
				directories : {
					'Gustav Content' : "",
					'Gustav Content - Bin' : "",
					'Gustav Content - Launcher' : ""
				}
			}
		}))

	}, [dispatch])


	const sidebarActiveState = useAppSelector(getSidebarActiveState);

	const activeSidebarTabComponent = SidebarOptions.find((sidebarOption) => {
		return sidebarOption.label === sidebarActiveState;
	})?.tabComponent || null;

	return (
		<main
			className="dark text-foreground bg-background"
			style={{
				height : '100vh'
			}}
		>
			{
				(setup) ?
					<div
						style={{
							padding : 20,
							display : 'flex',
							gap : 20,
							overflowY : 'auto',
							justifyContent : 'center',
							alignItems : 'center'
						}}
					>
						<SetupTab/>
					</div>
					 :
					<SteamCMDProvider>
						<div
							style={{
								display: 'grid',
								height : '100vh',
								gridTemplateColumns : setup ? 'auto' : '120px auto',
							}}
						>
							<Sidebar/>
							<div
								style={{
									padding : 20,
									display : 'flex',
									flexDirection : 'column',
									gap : 20,
									overflowY : 'auto'
								}}
							>
								{
									activeSidebarTabComponent
								}
							</div>
							<SteamModal/>
						</div>
					</SteamCMDProvider>
			}
		</main>
	);
}

export default App;
