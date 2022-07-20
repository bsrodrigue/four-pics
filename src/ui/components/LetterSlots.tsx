import { Container, Row, Col } from 'react-bootstrap';
import { LetterSlot as Slot } from '../../types';
import LetterSlot from './LetterSlot';

interface Props {
    role: 'picker' | 'target';
    actions: any;
    slots: Slot[];
}

function LetterSlots(props: Props) {
    const { role, slots, actions, } = props;

    return (
        <Container>
            <Row>
                {
                    slots.map((slot: Slot, index: number) => {
                        return (
                            <Col key={index} style={{ display: 'flex', justifyContent: 'center' }} >
                                <LetterSlot role={role} slot={slot} actions={actions} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default LetterSlots;