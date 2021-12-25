import { Container, Row, Col } from "react-bootstrap";
import { LetterSlots, ProblemPictures } from ".";
import LetterSlot from './LetterSlot';
import { GameSlots, Problem, Slot } from "../interfaces";

interface Props {
    problem: Problem;
    slots: GameSlots;
    pushLetter: Function;
}


function ProblemContainer(props: Props) {
    const { problem: { pictures }, slots: { targetSlots, pickerSlots }, pushLetter } = props;
    return (
        <>
            <ProblemPictures pictures={pictures} />
            <LetterSlots slots={targetSlots} />
            <hr />
            <Container>
                <Row>
                    {
                        pickerSlots.map((slot: Slot, index: number) => {
                            return (
                                <Col key={index}>
                                    <LetterSlot isPicker pushLetter={pushLetter} slot={slot} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default ProblemContainer;