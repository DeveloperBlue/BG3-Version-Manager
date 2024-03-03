import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiAlert, mdiAlertOutline, mdiCheckAll, mdiChevronDown, mdiDotsVertical, mdiFolder, mdiGamepadVariant, mdiGamepadVariantOutline, mdiLightningBoltOutline, mdiLinkVariantRemove, mdiSourceBranch, mdiSteam, mdiWebCancel, mdiWebCheck } from "@mdi/js";
import { useAppSelector } from "../../redux/hooks";
import { getInstalledVersions, getCurrentVersion } from "../../redux/slices/appSlice";
import AutomaticUpdatesBanner from './AutomaticUpdatesBanner/AutomaticUpdatesBanner';

const SteamInstance = () => {

    const installedVersions = useAppSelector(getInstalledVersions);
    const currentVersion = useAppSelector(getCurrentVersion);

    // Should set to the Steam Version
	const currentInstance = (currentVersion && currentVersion in installedVersions) ? installedVersions[currentVersion] : null;

    const isSteamPointingToOriginal : boolean = false;

    return (
        <div
            className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
        >
            <div
                style={{
                    display : 'flex',
                    justifyContent : 'space-between'
                }}
            >
                <h1>
                    Launch with Steam
                </h1>
                <Icon path={mdiSteam} size={1.4}/>
            </div>
            <AutomaticUpdatesBanner/>
            <div
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    gap : 10
                }}
            >
                {
                    (currentInstance) && <div
                        style={{
                            padding : 20,
                            borderRadius : 16,
                            backgroundColor : 'hsl(var(--nextui-default-100) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))',
                            display : 'flex',
                            flexDirection : 'column',
                            gap : 4
                        }}
                    >
                        <Icon path={mdiSourceBranch} size={1}/>

                        {
                            (isSteamPointingToOriginal) ? <p>
                                Your current Steam installation has not been modified.
                            </p> :
                            <>
                                <p>
                                    Your current Steam installation has been swapped with v{currentInstance.version} — {currentInstance.name}
                                </p>
                                <p>
                                    The original version installed on Steam is v1.0.0.0
                                </p>
                                <p
                                    className={'text-warning'}
                                    style={{
                                        display : 'flex',
                                        gap : 8,
                                        alignItems : 'center'
                                    }}
                                >
                                    <Icon path={mdiAlertOutline} size={0.8}/>
                                    Updating the game through Steam will overwrite this version.
                                </p>
                                <Button
                                    color="success"
                                    size="sm"
                                    style={{
                                        marginTop : 4
                                    }}
                                >
                                    Unlink and Reset Steam to Use Default Original Version (?)
                                </Button>
                            </>
                        }


                    </div>
                }
            </div>
            {
                (currentInstance) ? <>
                    <div
                        style={{
                            display : 'flex',
                            justifyContent : 'space-between',
                            gap : 10
                        }}
                    >
                        <div
                            style={{
                                display : 'flex',
                                gap : 10
                            }}
                        >
                            <ButtonGroup>
                                <Button
                                    color="primary"
                                    startContent={<Icon path={mdiSteam} size={1}/>}
                                    onPress={() => {

                                    }}
                                >
                                    Launch with Steam
                                </Button>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            color="primary"
                                            isIconOnly
                                        >
                                            <Icon path={mdiChevronDown} size={0.8}/>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Actions">
                                        <DropdownItem
                                            key="launch"
                                            endContent={<Icon path={mdiSteam} size={0.8}/>}
                                        >
                                            Launch Game
                                        </DropdownItem>
                                        <DropdownItem
                                            key="launch_dx11"
                                            endContent={<Icon path={mdiSteam} size={0.8}/>}
                                        >
                                            Launch Game (dx11)
                                        </DropdownItem>
                                        <DropdownItem
                                            key="larilauncher"
                                            endContent={<Icon path={mdiSteam} size={0.8}/>}
                                        >
                                            Launch Larian Launcher
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </ButtonGroup>
                        </div>
                        <div
                            style={{
                                display : 'flex',
                                justifyContent : 'flex-end',
                                alignItems : 'flex-end'
                            }}
                        >
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
                                    <DropdownSection title={'Actions'} showDivider>
                                        <DropdownItem key="shortcut" endContent={<Icon path={mdiLightningBoltOutline} size={0.8}/>}>Create Shortcut</DropdownItem>
                                        <DropdownItem key="open_folder" endContent={<Icon path={mdiFolder} size={0.8}/>}>Open Folder</DropdownItem>
                                    </DropdownSection>
                                    <DropdownSection title={'Launch (Non-Steam)'} showDivider>
                                        <DropdownItem key="launch" endContent={<Icon path={mdiGamepadVariant} size={0.8}/>}>Launch Game</DropdownItem>
                                        <DropdownItem key="launch_dx11" endContent={<Icon path={mdiGamepadVariant} size={0.8}/>}>Launch (dx11)</DropdownItem>
                                        <DropdownItem key="launch_larilauncher" endContent={<Icon path={mdiGamepadVariantOutline} size={0.8}/>}>Launch Larian Launcher</DropdownItem>
                                    </DropdownSection>
                                    <DropdownSection title={'Automatic Updates'}  showDivider>
                                        <DropdownItem key="disable_autoupdates" endContent={<Icon path={mdiWebCancel} size={0.8}/>}>Disable Automatic Updates</DropdownItem>
                                        <DropdownItem key="enable_autoupdates" endContent={<Icon path={mdiWebCheck} size={0.8}/>}>Enable Automatic Updates</DropdownItem>
                                    </DropdownSection>
                                    <DropdownSection>
                                        <DropdownItem key="unlink" endContent={<Icon path={mdiLinkVariantRemove} size={0.8}/>}>Unlink Steam</DropdownItem>
                                    </DropdownSection>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {
                            /*
                                MORE
                                - Launch Standalone (normal, dx11, Larian Launcher)
                                - Disable Auto Updates
                                - Reeanble Auto Updates
                            */
                        }
                    </div>
                </> : <span
                    style={{
                        textAlign : 'center',
                        fontStyle : 'italic',
                        paddingTop : 20,
                        paddingBottom : 40
                    }}
                >
                    No Active Steam Instance
                </span>
            }
        </div>
    )
}

export default SteamInstance;
