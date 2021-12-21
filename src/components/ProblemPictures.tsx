import { Col, Container, Row, Image } from 'react-bootstrap';
import { Problem } from '../interfaces';

const PICTURE_DIMENSION = '100%';
const PICTURE_WIDTH = PICTURE_DIMENSION;

interface Props {
    pictures: string[];
}

function ProblemPictures(props: Props) {
    const { pictures } = props;
    return (
        <Container style={{ width: 'clamp(400px, 80vw, 800px)', margin: '5em auto' }} fluid>
            <Row style={{ gap: '1em' }} >
                <Col>
                    <Image width={PICTURE_WIDTH} style={{ aspectRatio: '1/1' }} src={pictures[0]} />
                </Col>
                <Col>
                    <Image width={PICTURE_WIDTH} style={{ aspectRatio: '1/1' }} src={pictures[1]} />
                </Col>
            </Row>
            <Row style={{ gap: '1em' }} >
                <Col>
                    <Image width={PICTURE_WIDTH} style={{ aspectRatio: '1/1' }} src={pictures[2]} />
                </Col>
                <Col>
                    <Image width={PICTURE_WIDTH} style={{ aspectRatio: '1/1' }} src={pictures[3]} />
                </Col>
            </Row>
        </Container>
    )
}

export default ProblemPictures;