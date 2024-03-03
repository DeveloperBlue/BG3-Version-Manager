import InstalledVersions from "../components/InstalledVersions/InstalledVersions";
import RecentLaunches from "../components/RecentLaunches/RecentLaunches";
import { Tab, Tabs } from "@nextui-org/react";
import SteamInstance from "../components/SteamInstance/SteamInstance";
import DownloadProgress from "../components/DownloadProgress/DownloadProgress";
import InitialSetupProgress from "@components/SetupTab/InitialSetupProgress/InitialSetupProgress";
import { useState } from "react";
import { useAppSelector } from "@redux/hooks";
import { getSteamCMDStatus } from "@redux/slices/appSlice";


const HomeTab = () => {

    return (
        <div
            className={'flex flex-col gap-4'}
        >

			<InstalledVersions/>
			<SteamInstance/>
			<DownloadProgress/>
			<div>
				<span>
					Notes on Multiplayer
				</span>
				<span>
					Notes on BG3 Mod Manager
				</span>
			</div>

        </div>
    )
}

export default HomeTab;
