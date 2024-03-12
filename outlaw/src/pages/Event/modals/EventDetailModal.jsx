import React from 'react';
import {Button, Modal} from 'react-bootstrap';

function EventDetailModal({show, onHide, onBuyTickets, date, venue, menu, cost}) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{date.toLocaleDateString('en-US')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{venue}</Modal.Body>
            <Modal.Body>Serving {menu}</Modal.Body>
            <Modal.Body>Cost: {cost}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onBuyTickets}>
                    Buy Tickets
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EventDetailModal;