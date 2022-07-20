import { LetterSlot as Slot } from "../../types";

interface Props {
    slot: Slot;
    actions: any;
    role: 'picker' | 'target';
}


function LetterSlot(props: Props) {
    const { slot, actions, role } = props;
    const { letter, selected } = slot;

    function isEmpty() {
        if (role === 'picker') {
            if (selected) {
                return 'empty'
            } else {
                return '';
            }
        }
    }

    function click() {
        switch (role) {
            case 'target':
                break;
            case 'picker':
                if (isEmpty()) return;
                actions?.pushLetter(slot);
                break;
            default:
                break;
        }
    }


    function output() {
        let output = '';
        switch (role) {
            case 'target':
                output = selected ? letter : '';
                break;
            case 'picker':
                output = selected ? '' : letter;
                break;
            default:
                break;
        }
        return output;
    }

    return (<p onClick={click} className={`slot slot-${role} slot-${role}-${isEmpty()}`}>{output()}</p>);
}

export default LetterSlot;