
import InitialSetupProgress from "@components/SetupTab/InitialSetupProgress/InitialSetupProgress";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getApplicationSettings, getSteamCMDStatus, setSteamCMDStatus } from "@redux/slices/appSlice";
import { useEffect } from "react";

const SteamCMDProvider = ({children} : {children : React.ReactNode}) => {

	const dispatch = useAppDispatch();

	const { setup } = useAppSelector(getApplicationSettings);
	const steamCMDStatus = useAppSelector(getSteamCMDStatus)

    useEffect(() => {

		window.electron.ipcRenderer.onSteamCMDStatusUpdate((status) => {
			console.log("SteamCMD Status", status);
			dispatch(setSteamCMDStatus(status));
		})

        async function initSteamCMD() {

			const status = await window.electron.ipcRenderer.checkSteamCMD()

			console.log(status);

			if (status == 'NONE') {

				console.log("Init SteamCMD")
				window.electron.ipcRenderer.initSteamCMD();

			} else {

				dispatch(setSteamCMDStatus(status));

			}

        }

        initSteamCMD();

    }, [])

	if (steamCMDStatus == 'Ready') {
		return (
			<>
				{children}
			</>
		)
	}

    return (
		<div
			style={{
				padding : 20,
				display : 'flex',
				flexDirection : 'column',
				gap : 20,
				overflowY : 'auto'
			}}
		>
			<InitialSetupProgress/>
		</div>
    )
}

export default SteamCMDProvider;
