import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/EventCalendar.css'
import Stack from "react-bootstrap/Stack";
import EventDetailModal from '../modals/EventDetailModal.jsx'; // import EventDetailModal here
import TicketPurchaseModal from '../modals/TicketPurchaseModal'; // import TicketPurchaseModal here

function CalendarComponent() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState(0);
    const [secondModalShow, setSecondModalShow] = useState(false); // For second modal
    const [selectedVenue, setSelectedVenue] = useState("");
    const [filteredDates, setFilteredDates] = useState([]);


    // Array of dates you want to highlight and make clickable
    const highlightDates = [
        {
            date: new Date(2024, 3, 6),
            venue: "Gruner Brothers",
            menu: "steak and potatoes",
            cost: "$45.00",
            color: "yellow"
        },
        {
            date: new Date(2024, 3, 16),
            venue: "Three Crowns",
            menu: "chicken and rice",
            cost: "$35.00",
            color: "red"
        },
        {
            date: new Date(2024, 4, 14),
            venue: "Gruner Brothers",
            menu: "vodka",
            cost: "$25.00",
            color: "yellow"
        }
    ];

    const handleDateChange = (date) => {
        setDate(date);
        const index = highlightDates.findIndex(
            d => d.date.getFullYear() === date.getFullYear() &&
                d.date.getMonth() === date.getMonth() &&
                d.date.getDate() === date.getDate());
        setInfo(index);
        setShow(true);

    };

    useEffect(() => {
        if (selectedVenue) {
            const filtered = highlightDates.filter(item => item.venue === selectedVenue);
            setFilteredDates(filtered);
        } else {
            setFilteredDates(highlightDates);
        }
    }, [selectedVenue]);

    const handleVenueSelection = (venue) => {
        setSelectedVenue(prevVenue => prevVenue === venue ? "" : venue);
    };
    const isHighlightDate = (date) => {
        return filteredDates.some(d =>
            d.date.getFullYear() === date.getFullYear() &&
            d.date.getMonth() === date.getMonth() &&
            d.date.getDate() === date.getDate()
        );
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleSecondModalClose = () => {
        setSecondModalShow(false);
    } // For second modal
    const handleBuyTickets = () => {
        setShow(false);
        setSecondModalShow(true);
    }; // Function to close the first modal and open the second modal when Buy Tickets button is pressed.

    const [ticketHolderName, setTicketHolderName] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [mealOption, setMealOption] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // do something with the form field values
        // for example you can just print them to the console
        console.log(ticketHolderName, numberOfTickets, mealOption, specialInstructions);
        setSecondModalShow(false);  //close the form after submission
    };
    return (
        <div className="container">
            <div className="row">
                {/*<div className="col">*/}
                    {/*<div className="calendar-container">*/}
                        <div>
                            <div className={"showinfo"}>
                        <h1 className="text-center py-3 ">Calendar</h1>
                        <h3 className="text-center py-3 ">Select a highlighted date to view location, menu, and purchase tickets:</h3>

                            </div>
                        <div className="text-center py-3">
                            <div className={"calendar-border"}>
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                minDate={new Date(2024, 3, 1)}
                                maxDate={new Date(2024, 6, 31)}
                                navigationA11yLabel=""
                                prev2AriaLabel=""
                                next2AriaLabel=""
                                tileClassName={({date, view}) => {
                                    if (view === 'month') {
                                        const highlight = highlightDates.find(d =>
                                            d.date.getFullYear() === date.getFullYear() &&
                                            d.date.getMonth() === date.getMonth() &&
                                            d.date.getDate() === date.getDate()
                                        );
// console.log(highlight)

                                            return "yellow";  // return the color of the venue

                                    }
                                }}
                                tileDisabled={({date, view}) =>
                                    view === 'month' &&
                                    !isHighlightDate(date) // Disable clicking non-highlighted dates
                                }
                            />

                                <EventDetailModal
                                    show={show}
                                    onHide={handleClose}
                                    onBuyTickets={handleBuyTickets}
                                    date={date}
                                    venue={highlightDates[info].venue}
                                    menu={highlightDates[info].menu}
                                    cost={highlightDates[info].cost}
                                />

                                <TicketPurchaseModal
                                    show={secondModalShow}
                                    onHide={handleSecondModalClose}
                                    onSubmit={handleFormSubmit}
                                    date={date}
                                    venue={highlightDates[info].venue}
                                    ticketHolderName={ticketHolderName}
                                    setTicketHolderName={setTicketHolderName}
                                    numberOfTickets={numberOfTickets}
                                    setNumberOfTickets={setNumberOfTickets}
                                    mealOption={mealOption}
                                    setMealOption={setMealOption}
                                    specialInstructions={specialInstructions}
                                    setSpecialInstructions={setSpecialInstructions}
                                />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CalendarComponent;