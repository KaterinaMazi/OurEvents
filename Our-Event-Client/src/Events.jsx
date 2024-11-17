import { ListGroup, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Events = ({ events }) => {

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="text-center mb-4" style={{ color: '#800000', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Upcoming Events!</h2>
                    <ListGroup>
                        {events.map((event) => (
                            <ListGroup.Item
                                key={event.id}
                                className="list-group-item-action shadow text-center mb-3"
                                style={{
                                    maxWidth: '350px',
                                    margin: '0 auto',
                                    borderRadius: '15px',
                                    backgroundColor: '#f5f5f0',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    padding: '20px',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e0e0e0';
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                    e.currentTarget.style.boxShadow = '0px 12px 35px rgba(0, 0, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f5f5f0';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <Link to={`events/${event.id}`} className="text-decoration-none text-dark">
                                    <Card.Title className="fs-5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>{event.name}</Card.Title>
                                    <Card.Text className="text-muted small mt-2">Περισσότερα...</Card.Text>
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Events;
