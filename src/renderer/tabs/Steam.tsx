import SteamInstance from "../components/SteamInstance/SteamInstance";


const SteamTab = () => {
    return (
        <div
            className={'flex flex-col gap-4'}
        >
            <div
                className={'p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 rounded-large shadow-small w-full'}
            >
                <span>
                    Same warnings from the modal . . .
                </span>
            </div>
            <SteamInstance/>

        </div>
    )
}

export default SteamTab;
