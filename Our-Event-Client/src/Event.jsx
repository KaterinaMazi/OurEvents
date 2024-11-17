import React, { useState, useEffect } from 'react';
import { Spinner, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Countdown from './Countdown';
import RegistrationPage from './RegistrationPage';

const Event = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const eventIsOver = event ? new Date() >= event.ends_at : false

    const eventFetch = async () => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                setError(true);
                setMessage('You do not have access to this content!');
            } else {
                const data = await response.json();
                setEvent(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        eventFetch();
    }, [id]);

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    {loading && (
                        <div className="d-flex justify-content-center my-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                    {message && (
                        <Alert variant={error ? 'danger' : 'success'} className="text-center mt-3">
                            {message}
                        </Alert>
                    )}
                    {!loading && !error && event && (
                        <Card className="shadow-lg" style={{ backgroundColor: '#f5f5f0', borderRadius: '10px', padding: '20px' }}>
                            <Card.Body>
                                <Card.Title as="h2" className="text-center mb-4" style={{ color: '#800000', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                                    {event.name}
                                </Card.Title>
                                <Card.Text className="lead mb-4 text-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {event.description}
                                </Card.Text>
                                <div className="text-center">
                                    <Countdown eventDate={new Date(event.date_time).getTime()}
                                        endsAt={new Date(event.ends_at).getTime()}
                                        eventIsOver={eventIsOver}
                                    />
                                </div>
                                <div className="mt-5">
                                    {!eventIsOver && <RegistrationPage />}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                    {error && (
                        <div className="text-center">
                            <Button variant="outline-primary" className="mt-4" onClick={() => navigate('/')}>
                                Back to Home
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Event;
