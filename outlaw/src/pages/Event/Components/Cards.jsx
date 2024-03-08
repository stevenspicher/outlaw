import React from "react";
import Stack from "react-bootstrap/Stack";
import {Card} from "react-bootstrap";
import "../../css/EventCards.css"

const EventCards = () => {
    const actors = ["Clint", "Candice", "Jason", "Steven","Heather", "Lorie", "Tiana", "John", "Rikki", "Micheal", "Tannis"]
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
            <Stack direction={'horizontal'} className="event-stack centered">
                {actors.map((actor, index) => (
                    <div key={index} className="flip-card actor-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <Card className="event-card actor-card">
                                    {/*<Card.Img variant="top" src={`${actor}.jpg`} />*/}
                                    <Card.Body>
                                        <Card.Title>{actor}</Card.Title>
                                        <Card.Text>
                                            {actor}'s business card
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="flip-card-back">
                                <Card className="event-card actor-card">
                                    {/*<Card.Img variant="top" src={`${actor}.jpg`} />*/}
                                    <Card.Body>
                                        <Card.Title>{actor}</Card.Title>
                                        <Card.Text>
                                             {actor}'s bio
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </Stack>
                    </div>
                </div>
            </div>
        </>
    )
};
export default EventCards