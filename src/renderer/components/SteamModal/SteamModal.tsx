import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tooltip } from "@nextui-org/react";
import { getSteamModalData, setCurrentVersion, setSteamModalActive } from "../../redux/slices/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Icon from "@mdi/react";
import { mdiAlert, mdiCheckAll, mdiInformationOutline } from "@mdi/js";

const SteamModal = () => {

    const dispatch = useAppDispatch();

    const {isActive, version} = useAppSelector(getSteamModalData);

    const onClose = () => {
        dispatch(setSteamModalActive({active : false}));
    }

    return (
        <Modal isOpen={isActive} size={'xl'}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Link to Steam</ModalHeader>
                        <ModalBody>
                            {
                                (version) && <div>
                                    <h1>
                                        Version
                                    </h1>
                                    <h1>
                                        v{version.version} - {version.name}
                                    </h1>
                                    <span>
                                        {version.date}
                                    </span>
                                </div>
                            }

                            <p>
                                You are attempting to link this version of the game with Steam. When you launch from the Steam launcher, this version will be launched.
                            </p>
                            <p>
                                You can reset this at any time.
                            </p>
                            <div
                                style={{
                                    display : 'grid',
                                    gridTemplateColumns : '1fr 1fr',
									gap : 10
                                }}
                            >
                                <div
                                    className={"text-success"}
                                    style={{
                                        display : 'grid',
                                        gridTemplateColumns : '20px auto',
                                        gap : 10
                                    }}
                                >
                                    <Icon path={mdiCheckAll} size={1}/>
                                    <span>
                                        Steam Achievements
                                    </span>
                                </div>
                                <Tooltip
                                    className={"text-default"}
                                    content={"You can still host and join multiplayer sessions without going through Steam"}
                                    style={{
                                        display : 'flex',
                                        gap : 6
                                    }}
                                >
                                    <div
                                        className={"text-success"}
                                        style={{
                                            display : 'grid',
                                            gridTemplateColumns : '20px auto 20px',
                                            alignItems : 'center',
                                            gap : 10
                                        }}
                                    >
                                        <Icon path={mdiCheckAll} size={1}/>
                                        <span>
                                            Invites through Steam
                                        </span>
                                        <Icon path={mdiInformationOutline} size={0.8}/>
                                    </div>
                                </Tooltip>
                            </div>
							<div
                                style={{
                                    display : 'grid',
                                    gridTemplateColumns : '1fr 1fr',
									gap : 10
                                }}
                            >
								<div
									className={"text-success"}
									style={{
										display : 'grid',
										gridTemplateColumns : '20px auto',
										gap : 10
									}}
								>
									<Icon path={mdiCheckAll} size={1}/>
									<span>
										Steam will continue to track your hours
									</span>
								</div>
								<div
									className={"text-success"}
									style={{
										display : 'grid',
										gridTemplateColumns : '20px auto',
										gap : 10
									}}
								>
									<Icon path={mdiCheckAll} size={1}/>
									<span>
										Automatic Updates will be disabled
									</span>
								</div>
							</div>
                            <div
                                className={"text-warning"}
                                style={{
                                    display : 'grid',
                                    gridTemplateColumns : '20px auto',
                                    gap : 10
                                }}
                            >
                                <Icon path={mdiAlert} size={1}/>
                                <span>
                                	Steam may re-enable them at any time! Be sure to check that Steam says "Play" and not "Update" if you launch through the Steam Launcher.
                                </span>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            {
                                (version) && <Button color="primary" onPress={() => {
                                    console.log(`Set Active Steam Instance ${version.name}`)
                                    dispatch(setCurrentVersion(version.version));
                                    onClose();
                                }}>
                                    Link to Steam
                                </Button>
                            }

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default SteamModal;
