import { Input, Button } from "@nextui-org/react";

import Icon from "@mdi/react";
import { mdiFolder, mdiFolderEdit } from "@mdi/js";
import { setSidebarActiveState } from "../redux/slices/appSlice";
import { useAppDispatch } from "../redux/hooks";

const SettingsTab = () => {

	// const installSteamCMD = async () => {
	//   const steamCMDPath = path.join(process.cwd(), "/SteamCMD/");

	//   if (fs.existsSync(path.join(steamCMDPath, "/steamcmd.zip"))) {
	//     console.log("SteamCMD is already installed");
	//     return;
	//   }

	//   console.log("Installing SteamCMD");

	//   try {
	//     // TODO
	//     // Check if windows, macOS, or linux
	//     const steamCMD_URL_Windows =
	//       "https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip";

	//     const response = await fetch(steamCMD_URL_Windows);
	//     if (response.ok && response.body) {
	//       console.log("Response OKAY");

	//       const writer = createWriteStream(
	//         path.join(steamCMDPath, "/steamcmd.zip"),
	//         { flags: "w" }
	//       );

	//       writer.on("finish", () => {
	//         console.log("Done downloading SteamCMD");
	//       });
	//       writer.on("error", (e) => {
	//         console.log("Error", e);
	//       });
	//     }
	//   } catch (e) {
	//     console.log("Error", e);
	//   }
	// };

	const dispatch = useAppDispatch();

	return (
		<div className={"flex flex-col gap-4"}>
			<div
				className={
					"p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full"
				}
			>
				<span>Debug Menu</span>
				<Button
					onPress={() => {
						// installSteamCMD();
					}}
				>
					Download SteamCMD
				</Button>
			</div>

			<div
				className={
					"p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full"
				}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						gap: 10,
						alignItems: "flex-end",
					}}
				>
					<Input label={"SteamCMD Location"} labelPlacement="outside">
						{"C://Users//USER//Steam//steamapps//common/Baldurs Gate 3"}
					</Input>
					<Button endContent={<Icon path={mdiFolder} size={1} />}>
						Change Directory
					</Button>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						gap: 10,
						alignItems: "flex-end",
					}}
				>
					<Input
						label={"Steam Installation (Baldur's Gate Directory)"}
						labelPlacement="outside"
					>
						{"C://Users//USER//Steam//steamapps//common/Baldurs Gate 3"}
					</Input>
					<Button endContent={<Icon path={mdiFolderEdit} size={1} />}>
						Change Directory
					</Button>
				</div>
			</div>
			<Button
				onPress={() => {

				}}
			>
				Setup Tab
			</Button>
		</div>
	);
};

export default SettingsTab;
