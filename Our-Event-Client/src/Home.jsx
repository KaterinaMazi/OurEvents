import React, { useState, useEffect } from 'react';
import Events from './Events.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { FaRegSmile } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(events.length)

    const allMedia = events.flatMap((item) => {
        return item.media_files;
    });

    const eventsFetch = async () => {
        try {
            const response = await fetch('/api/events/', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        eventsFetch();
    }, []);

    const cardStyle = {
        background: 'linear-gradient(135deg, #d8cfc4 0%, #a79f91 100%)',
        padding: '20px',
        borderRadius: '8px',
    };

    const titleStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
        color: '#000',
    };

    const footerStyle = {
        backgroundColor: '#800000',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px',
    };

    return (
        <>
            <Container className="text-center my-5">
                <Row>
                    <Col>
                        <Card
                            style={cardStyle}
                            className="shadow mb-4"
                        >
                            <Card.Body>
                                <Card.Title
                                    as="h1"
                                    className="mb-4"
                                    style={titleStyle}
                                >
                                    Ανακάλυψε Μοναδικά Events!
                                </Card.Title>
                                <Card.Text className="lead mb-4">
                                    Στη σελίδα μας θα βρεις μια μεγάλη ποικιλία εκδηλώσεων που καλύπτουν κάθε γούστο και ενδιαφέρον.
                                    Εξερεύνησε τις επερχόμενες δραστηριότητες, ενημερώσου για τις τελευταίες προσθήκες και βρες την επόμενη εμπειρία που σε περιμένει.
                                    Είτε αναζητάς κάτι χαλαρό, είτε κάτι πιο συναρπαστικό, εδώ θα βρεις αυτό που ψάχνεις!
                                </Card.Text>

                                {allMedia.length > 0 && <ImageCarousel mediaFiles={allMedia} />}

                                <Card.Footer style={footerStyle}>
                                    <h5>
                                        <FaRegSmile className="mr-2" /> Don't miss the opportunity, live the experience!
                                    </h5>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {error && <Alert variant="danger" className="text-center">Σφάλμα: {error}</Alert>}

            {!loading && !error && <Events events={events} />}
            
            {events && events.length === 0 && !error && (
                <Alert className="mt-3 text-center" variant="info">
                Δεν βρέθηκαν εκδηλώσεις.
                </Alert>
            )} 
        </>
    );
}

export default Home;
