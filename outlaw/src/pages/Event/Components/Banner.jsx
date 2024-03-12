import React from "react";
import outlawLogo from '../../../assets/Outlaw_logo.png';
import poster from '../../../assets/cafe_noir_poster.png';
import "../../css/Banner.css"

const Banner = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
        <div className="banner">
            <img src={outlawLogo} alt="Outlaw Logo" className="logo"/>
        </div>
    <div >
        <img src={poster} alt="Poster" className="poster"/>
    </div>
                </div>
            </div>
        </div>
)
    ;
};
export default Banner;