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
        background: 'radial-gradient(circle, rgba(62,82,63,1) 0%, rgba(128,127,100,1) 49%, rgba(16,26,88,1) 100%)',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
        color: '#ffffff'
    };

    const titleStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
    };

    const footerStyle = {
        backgroundColor: 'radial-gradient(circle, rgba(250,249,169,1) 3%, rgba(62,131,66,1) 58%, rgba(16,26,88,1) 100%)',
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
                            <Card.Title
                                as="h3"
                                className="my-4"
                                style={titleStyle}
                            >
                                Ανακάλυψε Μοναδικά Events!
                            </Card.Title>
                            <Card.Text as="h5" className="lead mx-3">
                                Στη σελίδα μας θα βρεις μια μεγάλη ποικιλία εκδηλώσεων που καλύπτουν κάθε γούστο και ενδιαφέρον.
                                Εξερεύνησε τις επερχόμενες δραστηριότητες, ενημερώσου για τις τελευταίες προσθήκες και βρες την επόμενη εμπειρία που σε περιμένει.
                                Είτε αναζητάς κάτι χαλαρό, είτε κάτι πιο συναρπαστικό, εδώ θα βρεις αυτό που ψάχνεις!
                            </Card.Text>

                            {allMedia.length > 0 && <ImageCarousel mediaFiles={allMedia} />}

                            <Card.Footer style={footerStyle}>
                                <h5 style={{
                                        color: '#ffe462',
                                        
                                    }}>
                                    <FaRegSmile className="mr-2" style={{
                                        color: '#ffe462',
                                        marginRight: '1rem',
                                        marginBottom: '0.2rem'
                                    }} 
                                    /> Don't miss the opportunity, live the experience!
                                </h5>
                                <div className="my-4">
                                    {!loading && !error && <Events events={events} />}
                                </div>
                            </Card.Footer>
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


            {events && events.length === 0 && !loading && !error && (
                <Alert className="mt-3 text-center" variant="info">
                    Δεν βρέθηκαν εκδηλώσεις.
                </Alert>
            )}
        </>
    );
}

export default Home;
