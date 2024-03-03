import { mdiCloudDownload } from "@mdi/js";
import Icon from "@mdi/react";
import { Progress } from "@nextui-org/react";


const DownloadProgress = () => {
    return (
        <div
            className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
        >
            <div
                style={{
                    display : 'flex',
                    alignItems: 'center',
                    gap : 8
                }}
            >
                <Icon path={mdiCloudDownload} size={0.9}/>
                <h1>
                    Downloading v1.1.1-beta
                </h1>
            </div>
            <span>
                Estimated Time To Completion: 00h 00m 00s
            </span>
            <Progress
                isStriped={true}
                aria-label="Downloading..."
                label={'000 bytes of 000 bytes'}
                size="md"
                value={80}
                color="success"
                showValueLabel={true}
            />
        </div>
    )
}

export default DownloadProgress;
