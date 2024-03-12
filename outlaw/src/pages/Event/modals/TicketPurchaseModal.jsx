import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {CreditCard, PaymentForm} from "react-square-web-payments-sdk";
// import { Square } from '@square/web-sdk';
// import { PaymentForm } from 'react-square-web-payments-sdk';

function TicketPurchaseModal({show, onHide, onSubmit, date, venue, ticketHolderName, setTicketHolderName, numberOfTickets, setNumberOfTickets, mealOption, setMealOption, specialInstructions, setSpecialInstructions}) {
    const [card, setCard] = useState(null);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(card){
            try {
                const result = await card.createToken();
                if (result.status === 'SUCCESS') {
                    const token = result.token;
                    onSubmit(token);
                } else {
                    console.log(result.errors);
                }
            } catch (error) {
                console.log('Error creating token: ', error);
            }
        }
    }

    // useEffect(() => {
    //     const initializeCard = async () => {
    //         const payments = Square({ applicationId: 'your-application-id', locationId: 'your-location-id' });
    //         const card = await payments.card();
    //         setCard(card);
    //     };
    //     initializeCard();
    // }, []);
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Purchase Tickets for {date.toLocaleDateString('en-US')} at {venue}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
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
                    <div >
                        <PaymentForm
                            applicationId="sandbox-XXXXXX"
                            cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                                console.log('token:', token);
                                console.log('verifiedBuyer:', verifiedBuyer);
                            }}
                            locationId='XXXXXXXXXX'
                        >
                            <CreditCard/>
                        </PaymentForm>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default TicketPurchaseModal;