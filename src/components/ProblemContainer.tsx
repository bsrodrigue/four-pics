import { LetterSlots, ProblemPictures } from ".";
import { GameSlots, Problem, Slot, SlotActions } from "../interfaces";

interface Props {
    problem: Problem;
    slots: GameSlots;
    actions: SlotActions;
}

function ProblemContainer(props: Props) {
    const { problem: { pictures }, slots: { targetSlots, pickerSlots }, actions } = props;
    return (
        <>
            <ProblemPictures pictures={pictures} />
            <LetterSlots actions={actions} role="target" slots={targetSlots} />
            <hr />
            <LetterSlots actions={actions} role="picker" slots={pickerSlots} />
        </>
    )
}

export default ProblemContainer;