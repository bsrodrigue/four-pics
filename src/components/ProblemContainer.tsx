import { Container, Row, Col } from "react-bootstrap";
import { LetterSlots, ProblemPictures } from ".";
import { Problem } from "../interfaces";

const style = {
    letterSlot: {
        backgroundColor: 'grey',
        border: '1px black solid',
        height: '128px',
        width: '128px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '3em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

}

interface Props {
    problem: Problem;
    slotLetters: string[];
    pickerLetters: string[];
}


function ProblemContainer(props: Props) {
    const { problem: { pictures }, slotLetters, pickerLetters } = props;
    return (
        <>
            <ProblemPictures pictures={pictures} />
            <LetterSlots slotLetters={slotLetters} />
            <Container>
                <Row>
                    {
                        pickerLetters.map((letter: string, index: number) => {
                            return (
                                <Col style={style.letterSlot} key={index}>{letter}</Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default ProblemContainer;