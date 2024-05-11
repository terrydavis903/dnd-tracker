import PlayerCtx from "_contexts/PlayerCtx";
import RawFieldCtx from "_contexts/RawFieldCtx";

export function RawFieldButton(props){

    const {setRawFieldValue} = useContext(RawFieldCtx);
    const {player} = useContext(PlayerCtx);
    
    function openModal() {
        setRawFieldValue(props.property_name)
    }

    return (
        <div className='w-full h-full z-0'>
            <button
                onClick={openModal}
                className="text-sm font-medium text-white w-full h-full border-2"
            >
                <div className='bg-gray-600 text-xxl w-full h-20 border-2'>{player[props.property_name]}</div>
                <div className='bg-gray-600 w-full h-6 border-2'>{props.property_name}</div>
            </button>
        </div>
    )
}