import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/EventCalendar.css'

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
    const handleClose = () => setShow(false);
    const handleSecondModalClose = () => setSecondModalShow(false); // For second modal
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
                <div className="col">
                    <div className="calendar-container">
                        <h1 className="text-center py-3">Cafe Noir Schedule</h1>
                        <div className="text-center py-3">
                            <Button
                                onClick={() => handleVenueSelection('Gruner Brothers')} className="mx-3">
                                Gruner Brothers
                            </Button>
                            <Button
                                onClick={() => handleVenueSelection('Three Crowns')} className="mx-3">
                                Three Crowns
                            </Button>
                        </div>
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

                                        if (highlight) {
                                            return "red";  // return the color of the venue
                                        }
                                    }
                                }}
                                tileDisabled={({date, view}) =>
                                    view === 'month' &&
                                    !isHighlightDate(date) // Disable clicking non-highlighted dates
                                }
                            />

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{date.toLocaleDateString('en-US')}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{highlightDates[info].venue}</Modal.Body>
                                <Modal.Body>Serving {highlightDates[info].menu}</Modal.Body>
                                <Modal.Body>Cost: {highlightDates[info].cost}</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleBuyTickets}>
                                        Buy Tickets
                                    </Button>
                                </Modal.Footer>
                                {/* Add Second Modal here */}

                            </Modal>
                        </div>
                        <Modal show={secondModalShow} onHide={handleSecondModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Purchase Tickets for {date.toLocaleDateString('en-US')} at {highlightDates[info].venue}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleFormSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ticket Holder's Name</Form.Label>
                                        <Form.Control type="text" value={ticketHolderName}
                                                      onChange={(e) => setTicketHolderName(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Number of Tickets</Form.Label>
                                        <Form.Control type="number" value={numberOfTickets}
                                                      onChange={(e) => setNumberOfTickets(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meal Option</Form.Label>
                                        <Form.Select value={mealOption} onChange={(e) => setMealOption(e.target.value)}
                                                     required>
                                            <option value="">Select a meal option</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Special Instructions</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={specialInstructions}
                                                      onChange={(e) => setSpecialInstructions(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Purchase
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarComponent;