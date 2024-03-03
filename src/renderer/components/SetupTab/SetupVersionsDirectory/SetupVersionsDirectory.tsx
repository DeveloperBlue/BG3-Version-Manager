import { mdiFolder } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "@nextui-org/react";
import { useAppSelector } from "@redux/hooks";
import { getApplicationSettings } from "@redux/slices/appSlice";
import { useState } from "react";

const SetupVersionsDirectory = () => {

	const {versionsInstallationDir} = useAppSelector(getApplicationSettings)

	return (
		<div
			className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
		>
			<div>
				<p>
					Where would you like Baldurs Gate 3 Version Manager to install the different versions of the game?
				</p>
				<p
					style={{
						fontSize : '0.8em',
					}}
				>
					By default, we'll make a new "Versions" folder inside of this one. Leave as default if you're not sure.
				</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection : 'column',
					gap : 10
				}}
			>
				<span
					style={{
						fontSize : '0.8em',
					}}
				>
					Versions Installation Folder <span style={{color : '#aaa'}}>(THIS PROGRAM/Versions)</span>
				</span>
				<div
					style={{
						display : 'flex',
						justifyContent : 'space-between',
						gap : 10,
						alignItems : 'flex-end'
					}}
				>
					<div
						style={{
							backgroundColor : '#27272a',
							borderRadius : 12,
							padding : 10,
							paddingRight : 4,
							flex : 1,
							height : 40,
							display : 'flex',
							justifyContent : 'space-between',
							alignItems : 'center'
						}}
					>
						<span
							style={{
								flex : 1,
								flexGrow : 1
							}}
						>
							{versionsInstallationDir}
						</span>
						<Button
							size="sm"
						>
							Reset
						</Button>
					</div>


					<Button
						endContent={<Icon path={mdiFolder} size={1}/>}
						onPress={async () => {

							const dialogResponse = await window.electron.ipcRenderer.requestBaldursGateDirectoryDialog()

							if (dialogResponse.found == false) return;

							// setBaldursGateFolder(dialogResponse.path);

						}}
					>
						Change Directory
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SetupVersionsDirectory;
