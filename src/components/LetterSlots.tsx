import { Container, Row, Col } from 'react-bootstrap';

interface Props {
    word: string;
}

function LetterSlots(props: Props) {
    const { word } = props;

    return (
        <Container>
            <Row>
                {
                    word.split('').map((letter: string, index: number) => {
                        return (
                            <Col>{letter}</Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default LetterSlots;