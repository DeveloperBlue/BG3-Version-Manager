import SetupSteamGameDirectory from "@components/SetupTab/SetupSteamGameDirectory/SetupSteamGameDirectory";
import SetupVersionsDirectory from "@components/SetupTab/SetupVersionsDirectory/SetupVersionsDirectory";
import { mdiFolder, mdiFolderEdit } from "@mdi/js";
import Icon from "@mdi/react";
import { Input, Button, Checkbox, Spinner } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getApplicationSettings, getSetupTabDirectories, setApplicationSettings, setSetupTabDirectory, setSidebarActiveState } from "@redux/slices/appSlice";
import { BaldursGateDirectoryVerification } from "@shared_types/IPC";
import { useEffect, useRef, useState } from "react";

// TODO
// This should be pages
// Second page should have all the warnings about "Do not use new saves on old version etc etc. and an accept button"

const SetupLabelIdentifier = ({label} : {label : string}) => {
	return (
		<div
			className={'bg-primary rounded-large shadow-small'}
			style={{
				display : 'flex',
				width : 42,
				height : 42,
				justifyContent : 'center',
				alignItems : 'center',
				textAlign : 'center',
				fontSize : '1.2em',
				fontWeight : 600
			}}
		>
			<span>
				{label}
			</span>
		</div>
	)
}

const SetupTab = () => {

	const {
		steamInstallationDir : tabSteamInstallationDir,
		versionsInstallationDir : tabVersionsInstallationDir
	} = useAppSelector(getSetupTabDirectories)

	const dispatch = useAppDispatch();

	const [isPendingSave, setPendingSave] = useState(false);

	async function onContinueSetup() {

		setPendingSave(true);

		// Communicate this settings change to the main process

		const applicationConfig = {
			steamInstallationDir : tabSteamInstallationDir,
			versionsInstallationDir : tabVersionsInstallationDir,
			setup : false
		}

		const verifyConfig = await window.electron.ipcRenderer.passSetupConfig(applicationConfig)

		// Reflect this settings change in the redux state

		dispatch(setApplicationSettings(applicationConfig))

		/*
			Only once these are confirmed set, then move to the next tab
			This is began as soon as the SteamCMDProvider is mounted, it will begin installing Steam in the tabVersionsInstallationDir directory
		*/


		//
		setSidebarActiveState('Home');

		setPendingSave(false);

	}

	return (
		<div
			className={'flex flex-col gap-4'}
		>
			<h1>
				Welcome to Baldur's Gate 3 Version Manager
			</h1>
			<SetupLabelIdentifier label={"1"}/>
			<SetupSteamGameDirectory/>
			<SetupLabelIdentifier label={"2"}/>
			<SetupVersionsDirectory/>
			<div
				style={{
					display : 'flex',
					justifyContent : 'flex-end'
				}}
			>
				<Button
					color="primary"
					isDisabled={isPendingSave}
					onPress={onContinueSetup}
				>
					Next
				</Button>
			</div>
		</div>
	)
}

export default SetupTab;
