import React from 'react';
import {PayPalButtons} from "@paypal/react-paypal-js";
import {Modal} from "react-bootstrap";
import {addTicketGroup} from "../../../services/firebase/dbFunction";

const CheckoutModal = (props) => {

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.totalCost.toString()
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            const venue = props.options.venue;
            details.ticketInfo = props.options
            addTicketGroup(details).then(() => {
                props.handleClose();
                props.closeTicketModal();
                alert(name + ", thank you for your purchase! We will see you at " + venue + ". No need to provide a ticket - Ticket holder names will be checked at the door.")})
            ;
        });
    }
    return (
        <>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                {props.totalCost === "0" ? <></> : <>
                    <h3>Total Cost: {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(Number(props.totalCost))}</h3>
                </>}
            </Modal.Header>
            <Modal.Body>

                <div className="checkout">
                    <>
                        <PayPalButtons
                            style={{layout: "vertical"}}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </>
                </div>
            </Modal.Body>
        </Modal>
</>
    );
}

export default CheckoutModal;