import { mdiHome, mdiSteam, mdiViewList, mdiCog } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "@nextui-org/react";
import { SidebarKey } from "@shared_types/VersionTypes";
import HomeTab from "@tabs/Home";
import SettingsTab from "@tabs/Settings";
import SteamTab from "@tabs/Steam";
import VersionManagerTab from "@tabs/VersionManager";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getSidebarActiveState, setSidebarActiveState } from "@redux/slices/appSlice";
import SetupTab from "@tabs/Setup";
import { motion } from "framer-motion"


const SidebarOptions : {
    icon : React.ReactElement,
    label : SidebarKey,
    tabComponent : React.ReactElement,
    hidden? : true
}[] = [
    {
        icon : <Icon path={mdiHome} size={1}/>,
        label : 'Home',
        tabComponent : <HomeTab/>
    },
    {
        icon : <Icon path={mdiSteam} size={1}/>,
        label : 'Steam',
        tabComponent : <SteamTab/>
    },
    {
        icon : <Icon path={mdiViewList} size={1}/>,
        label : 'Version Manager',
        tabComponent : <VersionManagerTab/>
    },
    {
        icon : <Icon path={mdiCog} size={1}/>,
        label : 'Settings',
        tabComponent : <SettingsTab/>
    }
]

const SidebarButton = motion(Button);

const Sidebar = () => {

    const dispatch = useAppDispatch();

    const sidebarActiveState = useAppSelector(getSidebarActiveState);

    return (
        <div
            style={{
                borderRight : '1px solid hsl(var(--nextui-default-100) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))',
                paddingTop : 20,
                height : '100vh'
            }}
        >
            <div
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'center',
                    alignItems : 'center',
                    textAlign : 'center',
                    height : 100,
                }}
            >
                <span>
                    Baldurs Gate 3
                </span>
                <span>
                    Version Manager
                </span>
            </div>
            <div
                style={{
                    paddingLeft : 10,
                    paddingRight : 10,
                    display : 'flex',
                    flexDirection : 'column',
                    gap : 4
                }}
            >

                {
                    (SidebarOptions).map((option) => {
                        if (option.hidden) return null;
                        return (
                            <SidebarButton
                                key={option.label}
                                className='w-full'
                                variant={(option.label === sidebarActiveState) ? 'solid' : 'light'}
								animate={{ opacity : 1 }}
                                style={{
                                    justifyContent : 'center',
                                    alignItems : 'center',
                                    flexDirection : 'column',
                                    gap : 4,
                                    height : 80,
                                    whiteSpace : 'pre-wrap'
                                }}
                                startContent={option.icon}
                                onPress={() => {
                                    dispatch(setSidebarActiveState(option.label))
                                }}
                            >
                                {option.label}
                            </SidebarButton>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Sidebar;
export {SidebarOptions};
