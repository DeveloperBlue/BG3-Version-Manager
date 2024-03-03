import { mdiAlert, mdiCheckAll, mdiRefresh } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "@nextui-org/react";


const AutomaticUpdatesBanner = () => {

    let isAutomaticUpdatesDisabled : boolean = true;

    return (
        <div
            style={{
                display : 'flex',
                justifyContent : 'space-between',
                gap : 10,
                padding : 10,
                paddingLeft : 20,
                borderRadius : 16,
                backgroundColor : 'hsl(var(--nextui-default-100) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))'
            }}
        >
            <div
                style={{
                    display : 'flex',
                    alignItems : 'center',
                    gap : 6,
                    color : isAutomaticUpdatesDisabled ? '#17c964' : '#f31260'
                }}
            >
                <Icon path={isAutomaticUpdatesDisabled ? mdiCheckAll : mdiAlert} size={0.8}/>
                <span>
                    Automatic updates are {isAutomaticUpdatesDisabled ? '' : 'NOT '}disabled
                </span>
            </div>
            <div
                style={{
                    display : 'flex',
                    gap : 8
                }}
            >
                {
                    // eslint-disable-next-line eqeqeq
                    // @ts-ignore
                    (isAutomaticUpdatesDisabled === false) && 
                    <Button
                        size={'sm'}
                        color="primary"
                    >
                        Disable Automatic Updates
                    </Button>
                }
                
                <Button
                    isIconOnly={true}
                    title={'Refresh Status'}
                    size={'sm'}
                >
                    <Icon path={mdiRefresh} size={0.8}/>
                </Button>
            </div>
        </div>
    )
}

export default AutomaticUpdatesBanner;