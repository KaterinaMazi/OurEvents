import { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function Countdown({ eventDate, endsAt, eventIsOver }) {
    const initialCountdown = eventDate - new Date().getTime();
    const [countDown, setCountDown] = useState(initialCountdown);

    useEffect(() => {
        if (eventDate) {
            const interval = setInterval(() => {
                const countdownValue = eventDate - new Date().getTime();
                setCountDown(countdownValue);

                if (countdownValue < 0) {
                    clearInterval(interval);
                    setCountDown(0);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [eventDate, endsAt]);

    if (eventIsOver) {
        return (
            <Card className="text-center shadow-lg mt-4 border-0" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                <Card.Body>
                    <Card.Title className="fw-bold fs-4">The Event is over!</Card.Title>
                </Card.Body>
            </Card>
        );
    }

    if (countDown <= 0) {
        return (
            <Card className="text-center shadow-lg mt-4 border-0" style={{ backgroundColor: '#dff0d8', color: '#3c763d' }}>
                <Card.Body>
                    <Card.Title className="fw-bold fs-4">The Event has Started!</Card.Title>
                </Card.Body>
            </Card>
        );
    }

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return (
        <Card className="text-center shadow-lg mt-4 border-0" style={{ backgroundColor: '#f5f5f0' }}>
            <Card.Body>
                <Card.Title className="fw-bold fs-3">Countdown to Event</Card.Title>
                <Row className="pt-3">
                    <Col>
                        <div className="p-2 rounded" style={{ backgroundColor: '#d9d9d9' }}>
                            <h2 className="m-0">{days}</h2>
                            <small>Days</small>
                        </div>
                    </Col>
                    <Col>
                        <div className="p-2 rounded" style={{ backgroundColor: '#d9d9d9' }}>
                            <h2 className="m-0">{hours}</h2>
                            <small>Hours</small>
                        </div>
                    </Col>
                    <Col>
                        <div className="p-2 rounded" style={{ backgroundColor: '#d9d9d9' }}>
                            <h2 className="m-0">{minutes}</h2>
                            <small>Minutes</small>
                        </div>
                    </Col>
                    <Col>
                        <div className="p-2 rounded" style={{ backgroundColor: '#d9d9d9' }}>
                            <h2 className="m-0">{seconds}</h2>
                            <small>Seconds</small>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Countdown;
