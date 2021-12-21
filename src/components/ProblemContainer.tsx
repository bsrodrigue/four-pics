import { LetterSlots, ProblemPictures } from ".";
import { Problem } from "../interfaces";

interface Props {
    problem: Problem;
    slotLetters: string[];
}


function ProblemContainer(props: Props) {
    const { problem: { pictures }, slotLetters } = props;
    return (
        <>
            <ProblemPictures pictures={pictures} />
            <LetterSlots slotLetters={slotLetters} />
        </>
    )
}

export default ProblemContainer;