// Sample Component for displaying tickets sold for each date
import {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card'
import {sampleData} from "./sampleData.ts"
import {getDocumentsFromFirebase} from "../../services/firebase/dbFunction.ts";

// Calculate the total number of tickets sold



const Backstage = () => {
    const [ticketsData, setTicketsData] = useState({});
let totalTicketsSold = Object.values(ticketsData).reduce((total, group) => {
    return total + (group.ticketInfo.venue === "Gruner Brothers" ? Number(group.ticketInfo.numberOfTickets) : 0);
}, 0);

// Calculate the total cost of all tickets sold
let totalTicketCost = Object.values(ticketsData).reduce((total, group) => {
    return total + (group.ticketInfo.venue === "Gruner Brothers" ? Number(group.ticketInfo.totalCost) : 0);
}, 0);
useEffect(() => {
   getDocumentsFromFirebase().then(r => {
       setTicketsData(r)
   }
   )
}, []);
    return (
        <div style={{textAlign: 'left', width: '100%'}}>
            <Card>
                        <Card.Title>Gruner Brothers Brewing - April 6th</Card.Title>
                <Card.Footer className="text-muted">Total Tickets Sold: {totalTicketsSold} Total Sales: ${totalTicketCost}</Card.Footer>
            {Object.entries(ticketsData).map((group, index) => {
                if (group[1].ticketInfo.venue === "Gruner Brothers")
                return (
                <Card key={index} style={{width: '400px'}}>
                    <Card.Body>
                        <Card.Title>Card Holder: {group[1].payer.name.given_name} {group[1].payer.name.surname} </Card.Title>
                        <Card.Title>Number of Tickets: {group[1].ticketInfo.numberOfTickets}</Card.Title>
                        <Card.Title>Total Cost: {group[1].ticketInfo.totalCost}</Card.Title>
                    </Card.Body>

                </Card>
            )})}
            </Card>
        </div>
    );
};
export default Backstage