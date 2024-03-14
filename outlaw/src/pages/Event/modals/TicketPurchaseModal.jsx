import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import CheckoutModal from "./CheckoutModal.jsx";
import Stack from "react-bootstrap/Stack";
import ConfirmationModal from "./ConfirmationModal.jsx";

function TicketPurchaseModal({
                                 show,
                                 onHide,
                                 onSubmit,
                                 date,
                                 venue,
                                 ticketHolderNames,
                                 setTicketHolderNames,
                                 numberOfTickets,
                                 setNumberOfTickets,
                                 mealOptions,
                                 setMealOptions,
                                 specialInstructions,
                                 setSpecialInstructions,
                                 ticketCost,
                                 totalCost,
                                 setTotalCost
                             }) {
    const [showPaymentOptions, setShowPaymentOptions] = useState(false)
    const [showTicketModal, setShowTicketModal] = useState(true)
    const initialOptions = {
        //sandbox
        "client-id": "AYLTbBZn9l_je7FC1BZvW77YFQnkqXFziG6Eh8GukCI-LHeDFuTJTCpoijoj02o44brIO9BLcWPs6W-P",
        //testing
        // "client-id": "AVHdlUjjl49BqebNpOl_iv3hv2TZMBet1ZufwX2bxSS-0W6tbLnVg83KPSBszOCaGkkyUwqzVeWBoJGL",
        currency: "USD",
        intent: "capture",
        disableFunding: "credit"
    };
    const handleShow = () => {
        console.log(totalCost)
        if (totalCost === "0" || totalCost === 0) {
            alert("please select number of tickets and meal options")
        } else {
            setShowPaymentOptions(true)
            setShowTicketModal(false)
        }
    }
    const handleClose = () => {
        setShowPaymentOptions(false)
        setShowTicketModal(true)

    }

    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleConfirmationClose = () => {
        setShowConfirmation(false);
    }

    return (
        <>
            {!showTicketModal ? <>
                    <PayPalScriptProvider options={initialOptions}>
                        <CheckoutModal show={showPaymentOptions} handleClose={handleClose} totalCost={totalCost} closeTicketModal={onHide} options={{
                            venue: venue,
                            date: date,
                            numberOfTickets: numberOfTickets,
                            totalCost: totalCost,
                            mealOptions: mealOptions,
                            ticketHolderNames: ticketHolderNames,
                            specialInstructions: specialInstructions
                        }}/>
                    </PayPalScriptProvider>
                </> :
                <Modal show={show} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Stack>
                        <Modal.Title>Venue: {venue}</Modal.Title>
                            <Modal.Title>Date: {date.toLocaleDateString('en-US')}</Modal.Title>

                        </Stack>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Number of Tickets (@
                                    {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }
                                    ).format(Number(ticketCost))})
                                </Form.Label>
                                <Form.Control type="number" value={numberOfTickets} onChange={(e) => {
                                    setNumberOfTickets(e.target.value);
                                    setTotalCost((e.target.value * ticketCost).toString());
                                }} required/>
                            </Form.Group>
                            {totalCost === "0" ? <></> : <>
                                {/*<Form.Label><h3>Ticket Cost: {new Intl.NumberFormat('en-US', {*/}
                                {/*    style: 'currency',*/}
                                {/*    currency: 'USD'*/}
                                {/*}).format(Number(ticketCost))}</h3></Form.Label>*/}
                                <Form.Label><h3>Total Cost: {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(Number(totalCost))}</h3></Form.Label>

                                {/* Generate the Ticket Holder and Meal Option fields */}
                                {
                                    [...Array(parseInt(numberOfTickets))].map((_, i) => (
                                        <React.Fragment key={i}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ticket Holder's Name {i + 1}</Form.Label>
                                                <Form.Control type="text" value={ticketHolderNames[i]}
                                                              onChange={(e) => {
                                                                  let newNames = [...ticketHolderNames];
                                                                  newNames[i] = e.target.value;
                                                                  setTicketHolderNames(newNames);
                                                              }} required/>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Meal Option for Ticket Holder {i + 1}</Form.Label>
                                                <Form.Select defaultValue="" required onChange={(e) => {
                                                    let newOptions = [...mealOptions];
                                                    newOptions[i] = e.target.value;
                                                    setMealOptions(newOptions);
                                                }}>
                                                    <option disabled value="">Select a meal option</option>
                                                    <option value="1">Option 1</option>
                                                    <option value="2">Option 2</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </React.Fragment>
                                    ))
                                }
                                <Form.Group className="mb-3">
                                    <Form.Label>Special Instructions</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={specialInstructions}
                                                  onChange={(e) => setSpecialInstructions(e.target.value)}/>
                                </Form.Group>
                            </>
                            }

                            {/*<PayPalScriptProvider options={initialOptions}>*/}
                            <Button onClick={handleShow}>Checkout</Button>
                            {/*<CheckoutModal show={showPaymentOptions} handleClose={handleClose} totalCost={totalCost}/>*/}
                            {/*</PayPalScriptProvider>*/}
                            <PayPalScriptProvider options={initialOptions}>
                                <CheckoutModal show={showPaymentOptions} handleClose={handleClose}
                                               totalCost={totalCost}/>
                            </PayPalScriptProvider>
                            {/*<ConfirmationModal show={showConfirmation} onHide={handleConfirmationClose}/>*/}

                        </Form>
                    </Modal.Body>
                </Modal>}
        </>
    );
}

export default TicketPurchaseModal;