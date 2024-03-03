import { Spinner } from "@nextui-org/react";
import { useAppSelector } from "@redux/hooks";
import { getSteamCMDStatus } from "@redux/slices/appSlice";

const InitialSetupProgress = () => {

	const steamCMDStatus = useAppSelector(getSteamCMDStatus)

	return (
		<div
			className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
		>

			<span>
				Performing first time setup . . .
			</span>
			{
				(steamCMDStatus == 'Installing') && <>
					<span>
						Installing SteamCMD
					</span>
					<span>
						Creating Versions folder
					</span>
				</>
			}

			<Spinner/>
		</div>
	)
}

export default InitialSetupProgress;
