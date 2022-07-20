import { LetterSlots, ProblemPictures } from ".";
import { LetterSlotsState, Puzzle } from "../../types";

interface Props {
    problem: Puzzle;
    slots: LetterSlotsState;
    actions: any;
}

function ProblemContainer(props: Props) {
    const { problem: { pictures, universe }, slots: { targetSlots, pickerSlots }, actions } = props;
    return (
        <>
            <small style={{ color: 'white' }}>Du Manga/Anime: <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{universe}</span></small>
            <ProblemPictures pictures={pictures} />
            <LetterSlots actions={actions} role="target" slots={targetSlots} />
            <hr />
            <LetterSlots actions={actions} role="picker" slots={pickerSlots} />
        </>
    )
}

export default ProblemContainer;