import { Col, Container, Row, Image } from 'react-bootstrap'

const PICTURE_DIMENSION = '100%'
const PICTURE_WIDTH = PICTURE_DIMENSION

interface Props {
  pictures: string[]
}

export default function ProblemPictures(props: Props) {
  const { pictures } = props
  return (
    <Container style={{ width: '100%', margin: '2em auto' }} fluid>
      <Row style={{ gap: '0em' }}>
        <Col>
          <Image
            className='picture'
            width={PICTURE_WIDTH}
            style={{ aspectRatio: '1/1' }}
            src={pictures[0]}
          />
        </Col>
        <Col>
          <Image
            className='picture'
            width={PICTURE_WIDTH}
            style={{ aspectRatio: '1/1' }}
            src={pictures[1]}
          />
        </Col>
      </Row>
      <Row style={{ gap: '0em' }}>
        <Col>
          <Image
            className='picture'
            width={PICTURE_WIDTH}
            style={{ aspectRatio: '1/1' }}
            src={pictures[2]}
          />
        </Col>
        <Col>
          <Image
            className='picture'
            width={PICTURE_WIDTH}
            style={{ aspectRatio: '1/1' }}
            src={pictures[3]}
          />
        </Col>
      </Row>
    </Container>
  )
}
