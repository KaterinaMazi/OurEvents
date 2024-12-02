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
        transition: 'transform 3s ease-in-out, opacity 3s ease-in-out',
        maxHeight: '70vh', 
        objectFit: 'contain'
    };


    return (
            <Carousel fade interval={5000} pause="hover" 
            style={{
                margin: "2rem 0"
                }}>
                {carouselImages.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            src={image.file}
                            alt={`Slide ${index + 1}`}
                            style={carouselImageStyle}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
    );
}

export default ImageCarousel;
