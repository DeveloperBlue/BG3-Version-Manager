import { useState } from "react";
import { Version } from "../../../shared_types/VersionTypes";

const RecentLaunches = () => {

    const [lastLaunchedInstance, setLastLaunchedInstanced] = useState<(Version & {lastLaunchedTimestamp : string}) | null>(null);

    return (
        <div
            className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
        >
            <span>
                Last Launched Instance
            </span>
            {
                (lastLaunchedInstance) ? <>
                    <span>
                        {lastLaunchedInstance.name} v{lastLaunchedInstance.version} {lastLaunchedInstance.date}
                    </span>
                    <span>
                        Last launched on {lastLaunchedInstance.lastLaunchedTimestamp}
                    </span>
                </> :
                <span
                    style={{
                        textAlign : 'center',
                        fontStyle : 'italic',
                        paddingTop : 20,
                        paddingBottom : 40
                    }}
                >
                    You have no previously launched instances
                </span>
            }

        </div>
    )

}

export default RecentLaunches;
