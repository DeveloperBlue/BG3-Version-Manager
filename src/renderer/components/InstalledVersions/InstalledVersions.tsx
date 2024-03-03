import { Button } from "@nextui-org/react";
import VersionTable from "../VersionTable/VersionTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getInstalledVersions, setSidebarActiveState } from "../../redux/slices/appSlice";

const InstalledVersions = () => {

    const dispatch = useAppDispatch();

    const installedVersions = useAppSelector(getInstalledVersions);

    const hasAvailableVersions = (Object.values(installedVersions).length > 0);

    return (
        <div
            style={{
                display : 'flex',
                flexDirection : 'column',
                gap : 4
            }}
        >
            {
                (hasAvailableVersions) ? <>
                    <VersionTable installedOnly={true} showRedirect={true}/>
                </> :
                <div
                    className={'p-4 z-0 flex flex-col relative gap-4 bg-content1 rounded-large shadow-small w-full'}
                    style={{
                        display : 'flex',
                        paddingTop : 40,
                        paddingBottom : 40,
                        justifyContent : 'center',
                        alignItems : 'center',
                    }}
                >
                    <span>
                        You have no versions installed
                    </span>
                    <Button
                        size={'sm'}
                        color={'primary'}
                        onPress={() => {
                            dispatch(setSidebarActiveState('Version Manager'))
                        }}
                    >
                        Go to Version Manager
                    </Button>
                </div>
            }
        </div>
    )

}

export default InstalledVersions;
