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
import invasionLogo from '../../../assets/invasionBar.png'


function CalendarComponent() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState(0);
    const [secondModalShow, setSecondModalShow] = useState(false); // For second modal
    const [paymentModalShow, setPaymentModalShow] = useState(false); // For payment modal
    const [selectedVenue, setSelectedVenue] = useState("");
    const [filteredDates, setFilteredDates] = useState([]);
    const [ticketHolderNames, setTicketHolderNames] = useState([]);
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [mealOptions, setMealOptions] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [glutenFree, setGlutenFree] = useState(0);
    const [totalCost, setTotalCost] = useState("0")
    const [ticketObj, setTicketObj] = useState({})


    // Array of dates you want to highlight and make clickable
    const highlightDates = [
        {
            date: new Date(2024, 3, 6),
            venue: "Gruner Brothers Brewing - April 6th",
            website: "https://grunerbrewing.com/",
            logo: grunerLogo,
            menu: "Spring Salad, " +
                "\n" +
                "Marry Me Chicken (grilled chicken in thyme & sundried tomato cream sauce over angel hair pasta,\n" +
                "Gluten-Free option available), " +
                "\n" +
                "Cheesecake",
            cost: "57",
            color: "blue",
            showOptions: false,
            optionsList: [{value: 1, label:"Gluten Free"}],
            showCheckout: false
        },
        {
            date: new Date(2024, 3, 26),
            venue: "The Invasion Bar and Restaurant - Kaycee, WY",
            website: "https://www.invasionbar.com/",
            logo: invasionLogo,
            menu: "Salad, Lasagna, Dessert, Drink",
            cost: "57",
            color: "red",
            showOptions: false,
            showCheckout: true
        },
        {
            date: new Date(2024, 4, 18),
            venue: "Gruner Brothers Brewing - May 18th",
            logo: grunerLogo,
            website: "https://grunerbrewing.com/",
            menu: "Gumbo or Muffaleta, Jambalaya, Beignets",
            cost: "57",
            color: "yellow",
            showOptions: true,
            optionsList: [],
            showCheckout: true

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
                        {/*<h3 className="text-center py-3 ">Select a date to view location, menu, and purchase*/}
                        {/*    tickets: </h3>*/}
                        <h2 className="text-center py-3 ">Next performance April 26th in Kaycee, WY!  </h2>
                        {/*<h4 className="text-center py-3 ">Keep an eye out for upcoming performances!</h4>*/}
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

                                        return "blue";  // return the color of the venue

                                    }
                                }}
                                tileDisabled={({date, view}) =>
                                    view === 'month' &&
                                    !isHighlightDate(date) // Disable clicking non-highlighted dates
                                }
                            />
                        <h4 className="text-center py-3 highlighted-bold">Ticket holders do not need to provide tickets - a list will be checked at the door </h4>
                            <h5>(For more information, email
                                <a href="mailto:clint@opgart.com"> clint@opgart.com</a>)
                            </h5>
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
                                optionsList={highlightDates[info].optionsList}
                                specialInstructions={specialInstructions}
                                setSpecialInstructions={setSpecialInstructions}
                                glutenFree={glutenFree}
                                setGlutenFree={setGlutenFree}
                                ticketCost={highlightDates[info].cost}
                                totalCost={totalCost}
                                setTotalCost={setTotalCost}
                                ticketObj={ticketObj}
                                setTicketObj={setTicketObj}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarComponent;