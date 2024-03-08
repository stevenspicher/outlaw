import React from 'react';
import EventCards from "./Components/Cards.jsx";
import EventCarousel from "./Components/Carousel.jsx";
import EventCalendar from "./Components/EventCalendar.jsx";

const Event = () => {
    return (
       <>
           <EventCarousel/>
           <EventCalendar/>
           <EventCards/>
        </>
    );
};

export default Event;