import DownloadProgress from "../components/DownloadProgress/DownloadProgress";
import VersionTable from "../components/VersionTable/VersionTable";

const VersionManagerTab = () => {
    return (
        <div
            className={'flex flex-col gap-4'}
        >
            <DownloadProgress/>
            <VersionTable/>
        </div>
    )
}

export default VersionManagerTab;