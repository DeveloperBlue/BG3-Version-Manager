import { mdiChevronDown, mdiSteam, mdiDotsVertical, mdiLightningBoltOutline, mdiFolder, mdiDelete, mdiProgressDownload } from "@mdi/js";
import Icon from "@mdi/react";
import { Skeleton, Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ButtonGroup, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { useState, useMemo, Suspense, useEffect } from "react";
import { InstalledVersion, Version } from "../../../shared_types/VersionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getIsDownloadInProgress, getAllVersions, getInstalledVersions, getCurrentVersion, setDownloadInProgress, setSteamModalActive, setSidebarActiveState } from "../../redux/slices/appSlice";

const VersionTable = ({installedOnly = false, showRedirect = false} : {installedOnly? : boolean, showRedirect? : boolean}) => {

    const dispatch = useAppDispatch();

    const isDownloadInProgress = useAppSelector(getIsDownloadInProgress);
	const versions = useAppSelector(getAllVersions);

	const installedVersions = useAppSelector(getInstalledVersions);

	const currentVersion = useAppSelector(getCurrentVersion);

    const INSTANCES_PER_PAGE = 8;
	const [instancePageNumber, setInstancePageNumber] = useState(1);

	const pagedVersions = useMemo(() => {

		const start = (instancePageNumber - 1) * INSTANCES_PER_PAGE;
		const end = start + INSTANCES_PER_PAGE;

        if (installedOnly) {
            return Object.values(installedVersions).slice(start, end);
        }

		return versions.slice(start, end);

	}, [instancePageNumber, versions, installedOnly, installedVersions])

    return (
        <Suspense
            fallback={
                <Skeleton/>
            }
        >
            <Table aria-label="Uninstalled Versions"
                bottomContent={
                    <div
                        style={{
                            display : 'flex',
                            flexDirection : 'column',
                            gap : 10
                        }}
                    >
                        <div className={'flex w-full justify-center'}>
                            <Pagination
                                showControls
                                total={Math.ceil((installedOnly ? Object.values(installedVersions).length : versions.length) / INSTANCES_PER_PAGE)}
                                initialPage={1}
                                page={instancePageNumber}
                                onChange={(page) => {
                                    setInstancePageNumber(page);
                                }}
                            />
                        </div>
                        {
                            (showRedirect) && <div className={'flex w-full justify-center'}>
                                <Button
                                    size={'sm'}
                                    color={'primary'}
                                    variant="flat"
                                    onPress={() => {
                                        dispatch(setSidebarActiveState('Version Manager'))
                                    }}
                                >
                                    Go to Version Manager
                                </Button>
                            </div>
                        }
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn width={240}>NAME</TableColumn>
                    <TableColumn>VERSION</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn width={120}>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"Failed to fetch game versions"}
                >
                    {
                        pagedVersions.map((version) => {

                            const isInstalled = version.version in installedVersions;
                            const installedVersion : InstalledVersion | null = isInstalled ? installedVersions[version.version] : null;
                            const isSteamVersion = false;

                            return (
                                <TableRow key={version.name}>
                                    <TableCell>{version.name}</TableCell>
                                    <TableCell>{version.version}</TableCell>
                                    <TableCell>{version.date}</TableCell>
                                    <TableCell
                                        style={{
                                            display : 'flex',
                                            alignItems : 'center',
                                            gap : 8
                                        }}
                                    >
                                        {
                                            (() => {
                                                if (currentVersion === version.version) {
                                                    return <Chip color='primary' >Active</Chip>
                                                } else if (isInstalled) {
                                                    return <Chip>Installed</Chip>
                                                }
                                            })()
                                        }
                                        {
                                            (isSteamVersion) && <Chip>Steam</Chip>
                                        }
                                        {
                                            (isSteamVersion) && <Chip>Original</Chip>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {/* Download | Set Active | MORE -> Uninstall, Open Folder */}
                                        <div
                                            style={{
                                                display : 'flex',
                                                gap : 6,
                                                justifyContent : 'space-between'
                                            }}
                                        >
                                            {
                                                (isInstalled) ? <>
                                                <ButtonGroup>
                                                    <Button
                                                        color="primary"
                                                        size="sm"
                                                        onPress={() => {

                                                        }}
                                                    >
                                                        Launch
                                                    </Button>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                size={'sm'}
                                                                color="primary"
                                                                isIconOnly
                                                            >
                                                                <Icon path={mdiChevronDown} size={0.8}/>
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Actions">
                                                            <DropdownSection title={'Launch (Non-Steam)'} showDivider>
                                                                <DropdownItem
                                                                    key="launch"
                                                                >
                                                                    Launch Game
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="launch_dx11"
                                                                >
                                                                    Launch Game (dx11)
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="launch_larilauncher"
                                                                >
                                                                    Launch Larian Launcher
                                                                </DropdownItem>
                                                            </DropdownSection>
                                                            <DropdownSection>
                                                                <DropdownItem
                                                                    key="steam"
                                                                    className="text-primary"
                                                                    endContent={
                                                                        <Icon path={mdiSteam} size={0.8}/>
                                                                    }
                                                                    onPress={() => {
                                                                        if (installedVersion == null) return;
                                                                        dispatch(setSteamModalActive({active : true, version : installedVersion}))
                                                                    }}
                                                                >
                                                                    Link with Steam
                                                                </DropdownItem>
                                                            </DropdownSection>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </ButtonGroup>

                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="bordered"
                                                                size={'sm'}
                                                                isIconOnly
                                                            >
                                                                <Icon path={mdiDotsVertical} size={0.8}/>
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Actions">
                                                            <DropdownSection showDivider>
                                                                    <DropdownItem key="shortcut" endContent={<Icon path={mdiLightningBoltOutline} size={0.8}/>}>Create Shortcut</DropdownItem>
                                                                    <DropdownItem key="open_folder" endContent={<Icon path={mdiFolder} size={0.8}/>}>Open Folder</DropdownItem>
                                                            </DropdownSection>
                                                            <DropdownSection>
                                                                {
                                                                    /*
                                                                        Should popup a warning when deleting the STEAM instance
                                                                        Should we allow deleting the active instance? If it's cleaned up well, it should be fine.
                                                                    */
                                                                }
                                                                <DropdownItem key="delete" color="danger" className="text-danger" endContent={<Icon path={mdiDelete} size={0.8}/>}>Delete</DropdownItem>
                                                            </DropdownSection>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </>
                                                :
                                                <Button
                                                    size="sm"
                                                    isDisabled={isDownloadInProgress}
                                                    // TODO
                                                    // Tooltip when disabled for 'Can only download one instance at a time'
                                                    endContent={<Icon path={mdiProgressDownload} size={0.8}/>}
                                                    onPress={() => {
                                                        console.log(`Download ${version.name}`)
                                                        dispatch(setDownloadInProgress(true));
                                                    }}
                                                >
                                                    Download
                                                </Button>
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <div
                style={{
                    display : 'flex',
                    justifyContent : 'flex-end',
                    gap : 10
                }}
            >

            </div>
        </Suspense>
    )
}

export default VersionTable;
