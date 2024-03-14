import React, { Component } from 'react';
import outlawLogo from '../../../assets/Outlaw_logo.png';
import poster from '../../../assets/cafe_noir_poster.png';
import "../../css/Banner.css"

class Banner extends Component {
    state = {
        isImageLoaded: false,
        isTextFaded: false,
    }

    onImageLoad = () => {
        this.setState({ isImageLoaded: true });

        setTimeout(() => {
            this.setState({ isTextFaded: true });
        }, 900);  // After 900 milliseconds, the overlay text will fade
    }

    render() {
        const { isImageLoaded, isTextFaded } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={outlawLogo} alt="Outlaw Logo" className="logo"/>
                        </div>
                        <div>
                            <img
                                src={poster}
                                alt="Poster"
                                className={`poster ${isImageLoaded ? 'poster-after-load' : 'poster-before-load'}`}
                                onLoad={this.onImageLoad}
                            />
                            {!isTextFaded && (
                                // <div className={`overlay ${isImageLoaded ? 'overlay-hidden' : ''}`}>
                                    <div className="overlay-text">Presents...</div>
                                // </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Banner;