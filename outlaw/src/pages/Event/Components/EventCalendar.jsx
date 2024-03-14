import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/EventCalendar.css'
import Stack from "react-bootstrap/Stack";
import EventDetailModal from '../modals/EventDetailModal.jsx'; // import EventDetailModal here
import TicketPurchaseModal from '../modals/TicketPurchaseModal';
import grunerLogo from '../../../assets/grunerBrosLogo_small.png';
import threeCrownsLogo from '../../../assets/refinery.png'


function CalendarComponent() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState(0);
    const [secondModalShow, setSecondModalShow] = useState(false); // For second modal
    const [paymentModalShow, setPaymentModalShow] = useState(false); // For payment modal
    const [selectedVenue, setSelectedVenue] = useState("");
    const [filteredDates, setFilteredDates] = useState([]);
    const [ticketHolderNames, setTicketHolderNames] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [mealOptions, setMealOptions] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [totalCost, setTotalCost] = useState("0")


    // Array of dates you want to highlight and make clickable
    const highlightDates = [
        {
            date: new Date(2024, 3, 6),
            venue: "Gruner Brothers",
            website: "https://grunerbrewing.com/",
            logo: grunerLogo,
            menu: "Spring Salad," +
                "\n" +
                "Marry Me Chicken: (grilled chicken in thyme & sundried tomato cream sauce over angel hair pasta),\n" +
                "\n" +
                "Cheesecake",
            cost: "55",
            color: "yellow",
            showOptions: false,
            showCheckout: true
        },
        // {
        //     date: new Date(2024, 3, 16),
        //     venue: "The Refinery",
        //     website: "https://www.threecrownsgolfclub.com/dining/the-refinery",
        //     logo: threeCrownsLogo,
        //     menu: "TBD",
        //     cost: "TBD",
        //     color: "red",
        //     showOptions: false,
        //     showCheckout: false
        // },
        // {
        //     date: new Date(2024, 4, 14),
        //     venue: "Gruner Brothers",
        //     logo: grunerLogo,
        //     website: "https://grunerbrewing.com/",
        //     menu: "TBD",
        //     cost: "TBD",
        //     color: "yellow",
        //     showOptions: false,
        //     showCheckout: false
        //
        // }
    ];

    const handleDateChange = (date) => {
        setDate(date);
        const index = highlightDates.findIndex(
            d => d.date.getFullYear() === date.getFullYear() &&
                d.date.getMonth() === date.getMonth() &&
                d.date.getDate() === date.getDate());
        setInfo(index);
        setShow(true);
        setNumberOfTickets(0)

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
        setPaymentModalShow(true)
    } // For second modal
    const handleBuyTickets = () => {
        setShow(false);
        setSecondModalShow(true);
        setTotalCost(0)

    }; // Function to close the first modal and open the second modal when Buy Tickets button is pressed.




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
                        {/*<h1 className="text-center py-3 ">Calendar</h1>*/}
                        <h3 className="text-center py-3 ">Select a date to view location, menu, and purchase
                            tickets. </h3><h5>For more information, email clint@opgart.com. </h5>

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
                                logo={highlightDates[info].logo}
                                url={highlightDates[info].website}
                                menu={highlightDates[info].menu}
                                cost={highlightDates[info].cost}
                                showCheckout={highlightDates[info].showCheckout}
                            />
                            <TicketPurchaseModal
                                show={secondModalShow}
                                onHide={handleSecondModalClose}
                                onSubmit={handleFormSubmit}
                                date={date}
                                venue={highlightDates[info].venue}
                                showOptions={highlightDates[info].showOptions}
                                ticketHolderNames={ticketHolderNames}
                                setTicketHolderNames={setTicketHolderNames}
                                numberOfTickets={numberOfTickets}
                                setNumberOfTickets={setNumberOfTickets}
                                mealOptions={mealOptions}
                                setMealOptions={setMealOptions}
                                specialInstructions={specialInstructions}
                                setSpecialInstructions={setSpecialInstructions}
                                ticketCost={highlightDates[info].cost}
                                totalCost={totalCost}
                                setTotalCost={setTotalCost}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarComponent;