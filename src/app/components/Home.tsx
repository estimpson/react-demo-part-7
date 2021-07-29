import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Card } from 'react-bootstrap';

export class Home extends React.Component<{}> {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>App Root</Card.Title>
                                <Card.Text>Hello World</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to="/channels">Go to channel list</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xs={6}>Content on right half of screen</Col>
                </Row>
            </Container>
        );
    }
}
