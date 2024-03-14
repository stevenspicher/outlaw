import React from "react";
import Stack from "react-bootstrap/Stack";
import {Card} from "react-bootstrap";
import "../../css/EventCards.css"
import clint from "../../../assets/clint.jpeg"
import tanis from "../../../assets/tanis.jpeg"
import tiana from "../../../assets/tiana.jpeg"
import lorie from "../../../assets/lorie.jpg"
import jason from "../../../assets/jason.jpeg"
import heather from "../../../assets/heather.jpeg"
import michael from "../../../assets/michael.jpeg"
import rikki from "../../../assets/rikki.jpeg"
import steven from "../../../assets/steven.jpeg"
import john from "../../../assets/john.jpeg"
import candice from "../../../assets/candice.jpeg"

const EventCards = () => {
    const actors = [
        {name: "Candice", image: candice, bio:"Candice is excited to be performing again with Outlaw! She has performed in numerous local theater productions, most notably as Truvy in Steel Magnolias, Violet in 9to5, and Mother Superior in Nunsense. When not performing, she loves spending time with her wonderful husband, awesome teens, rambunctious corgi and grumpy cat.",},
        {name:"Clint", image: clint, bio:"Clint works as a professional photographer, visual artist, and college instructor.  He began doing theatre in 2010 and was instantly hooked. He has acted or directed in numerous plays at Stage III, Outlaw Theatre Productions, Opera Wyoming, and Theatre of the Poor over the past 12 years." + "My favorite thing about theatre is being a small part of something much bigger than myself.",},
        {name:"Heather", image: heather, bio: "Heather has been a member of Outlaw Theatre for several years and has appeared in various shows.   You may have also seen her at Stage III, most recently as Gloria in Grace & Glorie. She is thrilled to be back on stage with this wonderful group of friends, and excited to be playing Sheila Wonderly once again. When not on stage, she enjoys spending time at ‘The Manor’ where she is blessed to work with an amazing team of humans and the coolest kiddos around!"},
        {name:"Jason", image: jason, bio: "wonderful person, needs to turn in a bio"},
        {name:"John", image: john, bio: "wonderful person, needs to turn in a bio"},
        {name: "Lorie", image: lorie, bio: "Lorie is excited to get some of the craziness in her life released by being Maria. Lorie works full-time at WCDA and is pursuing her Masters in Social Work through UW/CC. Enjoy the show and don't make Maria mad, you may find yourself cursed."},
        {name: "Michael", image: michael, bio: "Michael Stedillie is retired from a 41 year career as a teacher, director, forensics coach and mentor.  He has occasionally acted in CC Summer Theatre and Stage III productions.  Some may recall his performances on the Krampert Stage as Sancho in Man of La Mancha, as Daddy Warbucks in Annie! and as Captain Hook in Peter Pan.  Michael is having a great time performing with this cast and hopes the audience has as much fun as he is."},
        {name:"Rikki", image: rikki, bio: "wonderful person, needs to turn in a bio"},
        {name:"Steven", image: steven, bio: "Steven Spicher works as a freelance software developer in various coffee shops around Wyoming and Colorado, and spends his free time directing and acting with local theater companies. Past roles include Red (Rothko), A Streetcar Named Desire (Stanley), and The House of Blue Leaves (Artie), and director credits include Rent, Die Fledermaus, Ride the Cyclone, and A Charlie Brown Christmas. Steven hopes you enjoy this show as much as he enjoyed working with the Outlaw group to put it together."},
        {name:"Tanis", image: tanis, bio: "Tanis started performing as a child and has been in numerous Stage III, Outlaw Theatre Productions, and Opera Wyoming. She teaches history at Casper College.  She does all she can to keep up with her crazy kids and her (crazier) husband, Clint."},
        {name: "Tiana", image: tiana, bio: "wonderful person, needs to turn in a bio"},
    ]
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
                                        <Card.Title>{actor.name}</Card.Title>
                                    <Card.Img variant="top" src={actor.image} />
                                    <Card.Body>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="flip-card-back">
                                <Card className="event-card actor-card">
                                    {/*<Card.Img variant="top" src={`${actor}.jpg`} />*/}
                                    <Card.Body>
                                        <Card.Title>{actor.name}</Card.Title>
                                        <Card.Text>
                                             {actor.bio}
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