import React from 'react';
import { Button, Col, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function EventDetailModal({ show, onHide, onBuyTickets, date, venue, logo, url, menu, cost, showCheckout }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{date.toLocaleDateString('en-US')} at {venue}</Modal.Title>
            </Modal.Header>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={logo} rounded style={{width: '100px', height: '100px'}}/>
            </Col>
            <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
                 <a href={url} target="_blank" rel="noopener noreferrer">{venue}</a>
            </Modal.Body>
            <Modal.Body>Menu: {menu}</Modal.Body>
            <Modal.Body>Cost: {cost}$</Modal.Body>
            <Modal.Footer>
                {showCheckout ?
                    <Button variant="primary" onClick={onBuyTickets}>
                        Buy Tickets
                    </Button> :
                    <p>Tickets available soon!</p>}
            </Modal.Footer>
        </Modal>
    );
}

export default EventDetailModal;