
import { Spinner } from "@nextui-org/react";
import { useAppDispatch } from "@redux/hooks";
import { setApplicationSettings } from "@redux/slices/appSlice";
import { ApplicationSettings } from "@shared_types/IPC";
import { ipcRenderer } from "electron/renderer";
import { useEffect, useState } from "react";


const ApplicationSettingsProvider = ({children} : {children : React.ReactNode}) => {

	const [isApplicationReady, setApplicationReady] = useState<boolean>(false);

	const dispatch = useAppDispatch();

    useEffect(() => {

		/* Get initial settings */
        async function getApplicationSettings() {

            console.log("Getting application settings")

            const applicationSettings = await window.electron.ipcRenderer.getApplicationSettings();

			console.log("applicationSettings", applicationSettings);

			dispatch(setApplicationSettings(applicationSettings))

			setApplicationReady(true);
        }

        getApplicationSettings();

		/* Listen for changes from the main process */

		window.electron.ipcRenderer.onApplicationSettingsUpdate((applicationSettings) => {
			dispatch(setApplicationSettings(applicationSettings))
		})

    }, [])


	if (isApplicationReady) {
		return children
	} else {
		return <Spinner/>
	}

}

export default ApplicationSettingsProvider;
