import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Alert } from 'react-bootstrap';

const Videos = ({ videos, isAdmin, handleDelete }) => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleOpenVideoModal = (index) => {
        setCurrentVideoIndex(index);
        setShowVideoModal(true);
    };

    const handleCloseVideo = () => setShowVideoModal(false);

    const nextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const previousVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    return (
        <>
            {videos.length === 0 ? (
                <Alert className="mt-3" variant="info">
                    Δεν βρέθηκαν βίντεο για αυτήν την εκδήλωση.
                </Alert>
            ) : (
                <Row className="mb-4">
                    {videos.map((mediaItem, index) => (
                        <Col xs={6} md={3} key={mediaItem.id}>
                            <Card className="mb-2 shadow" onClick={() => handleOpenVideoModal(index)}>
                                <Card.Body>
                                    <video controls className="img-fluid">
                                        <source src={mediaItem.file} type="video/mp4" />
                                        Ο περιηγητής σας δεν υποστηρίζει το στοιχείο βίντεο.
                                    </video>
                                    {isAdmin && (
                                        <Button
                                            variant="danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(mediaItem.id);
                                            }}
                                        >
                                            Διαγραφή
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal show={showVideoModal} onHide={handleCloseVideo} size="lg">
                <Modal.Body>
                    {videos.length > 0 && (
                        <div className="text-center">
                            <video
                                key={videos[currentVideoIndex].id}
                                controls
                                className="img-fluid"
                                onEnded={nextVideo}
                            >
                                <source src={videos[currentVideoIndex].file} type="video/mp4" />
                                Ο περιηγητής σας δεν υποστηρίζει το στοιχείο βίντεο.
                            </video>
                            <div className="d-flex justify-content-between mt-3">
                                <Button variant="link" className="text-muted" onClick={previousVideo}>
                                    &lt;
                                </Button>
                                <Button variant="link" className="text-muted" onClick={nextVideo}>
                                    &gt;
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVideo}>
                        Κλείσιμο
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Videos;
