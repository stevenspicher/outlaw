import React from 'react';
import {Carousel} from 'react-bootstrap';
import article from "../../../assets/article.png";
import castBios from "../../../assets/castBios.png";
import outlaw_logo from "../../../assets/Outlaw_logo.png";
import "../../css/EventCarousel.css"

const EventCarousel = () => {
    const images = [
        {src: outlaw_logo, label: '', description: ''},
        {src: article, label: '', description: ''},
        {src: castBios, label: '', description: ''}
    ];

    return (
        <div className="container carousel-border">
            <div className="row">
                <div className="col">
        <Carousel className={"event-carousel"}>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={`Slide ${index+1}`}
                    />
                    <Carousel.Caption>
                        <h3>{image.label}</h3>
                        <p>{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
                </div>
            </div>
        </div>
    );
};

export default EventCarousel;