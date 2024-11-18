import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Carousel, Alert } from 'react-bootstrap';

const Photos = ({ images, isAdmin, handleDelete }) => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleOpenImageModal = (index) => {
        setCurrentImageIndex(index);
        setShowImageModal(true);
    };

    const handleCloseImage = () => setShowImageModal(false);

    return (
        <>
            <style>{`
                .carousel-control-prev-icon,
                .carousel-control-next-icon {
                    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5)); /* Περισσότερη σκίαση */
                    background-color: rgba(0, 0, 0, 0.3); /* Προσθήκη χρώματος */
                    border-radius: 20%;
                    width: 25px;
                    height: 35px;
                }
            `}</style>

            {images.length === 0 ? (
                <Alert className="mt-3" variant="info">
                    Δεν βρέθηκαν φωτογραφίες για αυτήν την εκδήλωση.
                </Alert>
            ) : (
                <Row className="mb-4">
                    {images.map((mediaItem, index) => (
                        <Col xs={6} md={3} key={mediaItem.id}>
                            <Card className="gallery-item image mb-2 shadow-lg" onClick={() => handleOpenImageModal(index)}>
                                <Card.Img variant="top" src={mediaItem.file} alt={`Image ${mediaItem.id}`} />
                                {isAdmin && (
                                    <Card.Body>
                                        <Button
                                            variant="danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(mediaItem.id);
                                            }}
                                        >
                                            Διαγραφή
                                        </Button>
                                    </Card.Body>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal show={showImageModal} onHide={handleCloseImage} size="lg">
                <Modal.Body>
                    <Carousel activeIndex={currentImageIndex} onSelect={(selectedIndex) => setCurrentImageIndex(selectedIndex)}>
                        {images.map((mediaItem, index) => (
                            <Carousel.Item key={mediaItem.id}>
                                <img
                                    className="d-block w-100 shadow-lg"
                                    src={mediaItem.file}
                                    alt={`Preview ${mediaItem.id}`}
                                    style={{ maxHeight: '70vh', objectFit: 'contain' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseImage}>
                        Κλείσιμο
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Photos;
