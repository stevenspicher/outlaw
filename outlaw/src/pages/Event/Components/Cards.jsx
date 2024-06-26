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
        {name:"Jason", image: jason, bio: "Jason is a Casper native, local business owner and professional procrastinator. He is very excited to return to the role of Just Plain Rick."},
        {name:"John", image: john, bio: "John is excited to be back on stage with the Outlaw Gang.  I hope you enjoy the show and remember please keep an eye on your belongings as they may disappear during the performance.  Guys gotta make a livin"},
        {name: "Lorie", image: lorie, bio: "Lorie is excited to get some of the craziness in her life released by being Maria. Lorie works full-time at WCDA and is pursuing her Masters in Social Work through UW/CC. Enjoy the show and don't make Maria mad, you may find yourself cursed."},
        {name: "Michael", image: michael, bio: "Michael Stedillie is retired from a 41 year career as a teacher, director, forensics coach and mentor.  He has occasionally acted in CC Summer Theatre and Stage III productions.  Some may recall his performances on the Krampert Stage as Sancho in Man of La Mancha, as Daddy Warbucks in Annie! and as Captain Hook in Peter Pan.  Michael is having a great time performing with this cast and hopes the audience has as much fun as he is."},
        {name:"Rikki", image: rikki, bio: "Rikki is excited to be back on stage with Outlaw Theatre. Throughout the past several years she has appeared in a variety of roles with the company. When not on stage, Rikki spends her time hanging out with the best people around at Southridge Elementary and Evansville Elementary."},
        {name:"Steven", image: steven, bio: "Steven Spicher works as a freelance software developer in various coffee shops around Wyoming and Colorado, and spends his free time directing and acting with local theater companies. Past roles include Red (Rothko), A Streetcar Named Desire (Stanley), and The House of Blue Leaves (Artie), and director credits include Rent, Die Fledermaus, Ride the Cyclone, and A Charlie Brown Christmas. Steven hopes you enjoy this show as much as he enjoyed working with the Outlaw group to put it together."},
        {name:"Tanis", image: tanis, bio: "Tanis started performing as a child and has been in numerous Stage III, Outlaw Theatre Productions, and Opera Wyoming. She teaches history at Casper College.  She does all she can to keep up with her crazy kids and her (crazier) husband, Clint."},
        {name: "Tiana", image: tiana, bio: "Tiana is excited to share the stage with her parents once again, and the rest of her extended theatre family. She will wear many hats in this show and wants to remind you who the real Nightingale Malone is. Hint, it’s not the bald guy. When not working with Outlaw, you can find Tiana galavanting with Opera Wyoming, Theatre of the Poor, and Stage III. When not at a theatre, Tiana can be found at home cuddling her fur babies. She hopes you enjoy the show!"},
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
                                    <Card.Body>
                                        <p style={{ fontSize: '10px', overflow: 'scroll'}}>
                                             {actor.bio}
                                        </p>
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