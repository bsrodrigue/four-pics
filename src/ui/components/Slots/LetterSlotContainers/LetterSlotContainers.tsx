import { Container, Row, Col } from 'react-bootstrap'
import { LetterSlot } from '../../../../types'
import { LetterSlotContainer } from '../LetterSlotContainer'

interface Props {
  role: 'picker' | 'target'
  slots: LetterSlot[]
}

export default function LetterSlotContainers({ role, slots }: Props) {
  return (
    <Container>
      <Row>
        {slots.map((slot: LetterSlot, index: number) => (
          <Col key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <LetterSlotContainer role={role} slot={slot} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
