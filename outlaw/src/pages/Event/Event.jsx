import React from 'react';
import EventCards from "./Components/Cards.jsx";
import EventCarousel from "./Components/Carousel.jsx";
import EventCalendar from "./Components/EventCalendar.jsx";
import Banner from "./Components/Banner.jsx";

const Event = () => {
    return (
        <div className={"main_container"}>
            <Banner/>
            <EventCalendar/>
            <EventCards/>
        </div>
    );
};

export default Event;