import React from 'react';
import { Carousel } from 'react-bootstrap';

function ImageCarousel({ mediaFiles }) {
    const getRandomImages = (mediaFiles) => {
        const images = mediaFiles.filter((file) => file.file_type === 'image');
        const shuffled = images.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3) || [];
    };

    const carouselImages = getRandomImages(mediaFiles);

    const carouselImageStyle = {
        width: '100%',
        height: '450px',
        objectFit: 'cover',
        borderRadius: '15px',
        transition: 'transform 3s ease-in-out, opacity 3s ease-in-out',
    };

    return (
        <Carousel fade interval={5000} pause="hover">
            {carouselImages.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.file}
                        alt={`Slide ${index + 1}`}
                        style={{ ...carouselImageStyle, transform: 'scale(1.1)' }}
                    />
                    <Carousel.Caption style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}>
                        <h3>Εξερεύνησε το επόμενο event!</h3>
                        <p>Συμμετείχε σε μοναδικές εμπειρίες με άλλους λάτρεις των εκδηλώσεων.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImageCarousel;
