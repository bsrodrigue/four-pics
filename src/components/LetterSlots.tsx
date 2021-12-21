import { Container, Row, Col } from 'react-bootstrap';

const style = {
    letterSlot: {
        backgroundColor: 'grey',
        border: '1px black solid',
        height: '128px',
        width: '128px',
    }
}
interface Props {
    slotLetters: string[];
}

function LetterSlots(props: Props) {
    const { slotLetters } = props;

    return (
        <Container>
            <Row>
                {
                    slotLetters.map((letter: string, index: number) => {
                        return (
                            <Col style={style.letterSlot} key={index}>{letter}</Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default LetterSlots;