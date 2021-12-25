import { Container, Row, Col } from 'react-bootstrap';
import { Slot } from '../interfaces';
import LetterSlot from './LetterSlot';

interface Props {
    slots: Slot[];
}

function LetterSlots(props: Props) {
    const { slots } = props;

    return (
        <Container>
            <Row>
                {
                    slots.map((slot: Slot, index: number) => {
                        return (
                            <Col key={index} style={{ display: 'flex', justifyContent: 'center' }} >
                                <LetterSlot isPicker={false} slot={slot} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default LetterSlots;