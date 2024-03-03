import { mdiFolder } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getSetupTabDirectories, setSetupTabDirectory } from "@redux/slices/appSlice";
import { BaldursGateDirectoryVerification } from "@shared_types/IPC";
import { useEffect, useState } from "react";

const SetupSteamGameDirectory = () => {

	const dispatch = useAppDispatch()

	const {steamInstallationDir : tabSteamInstallationDir} = useAppSelector(getSetupTabDirectories)

	const [directoryChecks, setDirectoryChecks] = useState<BaldursGateDirectoryVerification>({
		includesBG3Name : false,
		hasGameFolders : false,
		isNotFromVersionManager : false,
		passed : false,
	})

	useEffect(() => {

		async function verifyBaldursGateDirectory() {
			const checks = await window.electron.ipcRenderer.verifyBaldursGateDirectory(tabSteamInstallationDir)
			setDirectoryChecks(checks);
		}

		verifyBaldursGateDirectory();

	}, [tabSteamInstallationDir])

	/*
		First do auto-detect to find the game on Windows and MacOS
	*/

	const [isAutoDetecting, setIsAutoDetecting] = useState(false);

	useEffect(() => {

		setIsAutoDetecting(true);

		/*
			Ask main process to do auto-detect
		*/

		function autodetectBaldursGateInstallation() {

			/*
				Include a timeout!
			*/

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(true);
				}, 2000)
			})


		}

		autodetectBaldursGateInstallation().then(() => {

			setIsAutoDetecting(false);

		})

	}, [])

	return (
		<div
			className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
		>
			<div>
				<p>
					Do you already have Baldur's Gate 3 Installed on Steam?
				</p>
				<p
					style={{
						fontSize : '0.8em',
					}}
				>
					We'll need this if you want to launch an alternate version with Steam. This can be set later.
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
					Baldurs Gate 3 Steam Installation <span style={{color : '#aaa'}}>(e.g. C:/Users/USER/Program Files/Steam/steamapps/common/Baldurs Gate 3)</span>
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
							{tabSteamInstallationDir}
						</span>
						<Button
							size="sm"
							isLoading={isAutoDetecting}
						>
							Autodetect
						</Button>
					</div>


					<Button
						endContent={<Icon path={mdiFolder} size={1}/>}
						onPress={async () => {

							const dialogResponse = await window.electron.ipcRenderer.requestBaldursGateDirectoryDialog()

							if (dialogResponse.found == false) return;

							dispatch(setSetupTabDirectory({key : "steamInstallationDir", directory : dialogResponse.path}))

						}}
					>
						Change Directory
					</Button>
				</div>
				<div>

				</div>
				<span className={'text-danger'} style={{fontSize : '0.8em'}}>
					Error messages
				</span>
			</div>
		</div>
	)
}

export default SetupSteamGameDirectory;
