import { Slot } from "../interfaces";

const style = {
    letterSlot: {
        backgroundColor: 'grey',
        border: '2px black solid',
        height: '15px',
        width: '15px',
        padding: '1em',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '2em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

interface Props {
    slot: Slot;
    pushLetter?: Function;
    isPicker: boolean;
}

function LetterSlot(props: Props) {
    const { slot, pushLetter, isPicker } = props;
    const { letter, index, selected } = slot;

    return (
        <>
            {
                isPicker ? (
                    <p onClick={() => { pushLetter && !selected && pushLetter(slot) }} style={style.letterSlot}>{selected ? '' : letter}</p>
                ) : (
                    <p onClick={() => { pushLetter && pushLetter(slot) }} style={style.letterSlot}>{selected ? letter : ''}</p>
                )
            }
        </>
    )
}

export default LetterSlot;