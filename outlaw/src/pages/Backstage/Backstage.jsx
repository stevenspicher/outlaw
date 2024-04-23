// Sample Component for displaying tickets sold for each date
import {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card'
import {sampleData} from "./sampleData.ts"
import { Accordion } from 'react-bootstrap';
import {getDocumentsFromFirebase} from "../../services/firebase/dbFunction.ts";
import { Button } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';

// Calculate the total number of tickets sold



const Backstage = () => {
    const [ticketsData, setTicketsData] = useState({});
    const [excelData, setExcelData] = useState([])
let grunerTotalTicketsSold = Object.values(ticketsData).reduce((total, group) => {
    return total + (group.ticketInfo.venue === "Gruner Brothers" ? Number(group.ticketInfo.numberOfTickets) : 0);
}, 0);

// Calculate the total cost of all tickets sold
let grunerTotalTicketCost = Object.values(ticketsData).reduce((total, group) => {
    return total + (group.ticketInfo.venue === "Gruner Brothers" ? Number(group.ticketInfo.totalCost) : 0);
}, 0);

let gruner2TotalTicketsSold = Object.values(ticketsData).reduce((total, group) => {
        return total + (group.ticketInfo.venue === "Gruner Brothers Brewing - May 18th" ? Number(group.ticketInfo.numberOfTickets) : 0);
    }, 0);

// Calculate the total cost of all tickets sold
    let gruner2TotalTicketCost = Object.values(ticketsData).reduce((total, group) => {
        return total + (group.ticketInfo.venue === "Gruner Brothers Brewing - May 18th" ? Number(group.ticketInfo.totalCost) : 0);
    }, 0);

    let kayceeTotalTicketsSold = Object.values(ticketsData).reduce((total, group) => {
        return total + (group.ticketInfo.venue === "The Invasion Bar and Restaurant - Kaycee, WY" ? Number(group.ticketInfo.numberOfTickets) : 0);
    }, 0);

// Calculate the total cost of all tickets sold
    let kayceeTotalTicketCost = Object.values(ticketsData).reduce((total, group) => {
        return total + (group.ticketInfo.venue === "The Invasion Bar and Restaurant - Kaycee, WY" ? Number(group.ticketInfo.totalCost) : 0);
    }, 0);



    const exportToExcel = () => {
let data = [];
        let glutenFreeCount;
        Object.entries(ticketsData).map((tickets) => {
            console.log(tickets[1])
            glutenFreeCount = Object.values(tickets[1].ticketInfo.mealOptions)
                .filter(mealOption => mealOption).length;
            data.push({
                ticketHolder: tickets[1].payer.name.given_name + " " + tickets[1].payer.name.surname,
                tickets: tickets[1].ticketInfo.numberOfTickets,
                glutenFree: glutenFreeCount,
                specialInstructions: tickets[1].ticketInfo.specialInstructions
            })
        })

            // Convert JSON to Worksheet
            const worksheet = utils.json_to_sheet(data);

        worksheet['!cols'] = [
            { wch: 20 }, // "ticketHolder" column width. Adjust as needed.
            { wch: 15 }, // "tickets" column width. Adjust as needed.
            { wch: 15 }, // "glutenFree" column width. Adjust as needed.
            { wch: 50 }  // "specialInstructions" column width. Adjust as needed.
        ];

            // Create a workbook
            const workbook = utils.book_new();

            utils.book_append_sheet(workbook, worksheet, "Sheet1");
            //
            // Export book
            writeFile(workbook, ticketsData[0].ticketInfo.venue + '.xlsx');
    };

useEffect(() => {
   getDocumentsFromFirebase().then(r => {
       setTicketsData(r);
               })

}, []);
    return (

        <div style={{textAlign: 'left', width: '100%'}}>
                <Accordion defaultActiveKey="0">
                    <Card>
                    <Accordion.Item>
                    <Accordion.Header>
                        <Card.Title>Gruner Brothers Brewing - April 6th</Card.Title>
                    </Accordion.Header>
                    <Accordion.Body>
                <Button variant="primary" onClick={exportToExcel}>Export</Button>
                    <Card.Body>
                <Card.Footer className="text-muted">Total Tickets Sold: {grunerTotalTicketsSold} Total Sales: ${grunerTotalTicketCost}</Card.Footer>
                    </Card.Body>
            {Object.entries(ticketsData).map((group, index) => {
                if (group[1].ticketInfo.venue === "Gruner Brothers")
                return (
                <Card key={`accord-${index}`} style={{width: '400px'}}>
                        <Card.Title>Card Holder: {group[1].payer.name.given_name} {group[1].payer.name.surname} </Card.Title>
                        <Card.Title>Number of Tickets: {group[1].ticketInfo.numberOfTickets}</Card.Title>
                        <Card.Title>Total Cost: {group[1].ticketInfo.totalCost}</Card.Title>
                    <Card.Body>
                        <Card.Title>Guests:</Card.Title>
                        <Card.Title> {Object.entries(group[1].ticketInfo.ticketHolderNames).map((name, guestIndex) =>
                        { return (

                           <p key={guestIndex}>{guestIndex +1}: {name[1]}</p>
                        )
                        })}</Card.Title>
                        <Card.Title>{(() => {
                            const glutenFreeCount = Object.values(group[1].ticketInfo.mealOptions)
                                .filter(mealOption => mealOption).length;
                            if (glutenFreeCount > 0) {
                                return (
                                    <>
                                        Gluten free: {glutenFreeCount}
                                    </>
                                )
                            }
                        })()}</Card.Title>
                    </Card.Body>

                </Card>
            )})}
                    </Accordion.Body>
            </Accordion.Item>
            </Card>
                </Accordion>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Item>
                        <Accordion.Header>
                            <Card.Title>The Invasion Bar and Restaurant - Kaycee, WY</Card.Title>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Button variant="primary" onClick={exportToExcel}>Export</Button>
                            <Card.Body>
                                <Card.Footer className="text-muted">Total Tickets Sold: {kayceeTotalTicketsSold} Total Sales: ${kayceeTotalTicketCost}</Card.Footer>
                            </Card.Body>
                            {Object.entries(ticketsData).map((group, index) => {
                                console.log(group[1].ticketInfo.venue)
                                if (group[1].ticketInfo.venue === "The Invasion Bar and Restaurant - Kaycee, WY")
                                    return (
                                        <Card key={`accord-${index}`} style={{width: '400px'}}>
                                            <Card.Title>Card Holder: {group[1].payer.name.given_name} {group[1].payer.name.surname} </Card.Title>
                                            <Card.Title>Number of Tickets: {group[1].ticketInfo.numberOfTickets}</Card.Title>
                                            <Card.Title>Total Cost: {group[1].ticketInfo.totalCost}</Card.Title>
                                            <Card.Body>
                                                {/*<Card.Title>Guests:</Card.Title>*/}
                                                {/*<Card.Title> {Object.entries(group[1].ticketInfo.ticketHolderNames).map((name, guestIndex) =>*/}
                                                {/*{ return (*/}

                                                {/*    <p key={guestIndex}>{guestIndex +1}: {name[1]}</p>*/}
                                                {/*)*/}
                                                {/*})}</Card.Title>*/}
                                                {/*<Card.Title>{(() => {*/}
                                                {/*    const glutenFreeCount = Object.values(group[1].ticketInfo.mealOptions)*/}
                                                {/*        .filter(mealOption => mealOption).length;*/}
                                                {/*    if (glutenFreeCount > 0) {*/}
                                                {/*        return (*/}
                                                {/*            <>*/}
                                                {/*                Gluten free: {glutenFreeCount}*/}
                                                {/*            </>*/}
                                                {/*        )*/}
                                                {/*    }*/}
                                                {/*})()}</Card.Title>*/}
                                            </Card.Body>

                                        </Card>
                                    )})}
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
            </Accordion>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Item>
                                <Accordion.Header>
                                    <Card.Title>Gruner Brothers Brewing - May 18th</Card.Title>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Button variant="primary" onClick={exportToExcel}>Export</Button>
                                    <Card.Body>
                                        <Card.Footer className="text-muted">Total Tickets Sold: {gruner2TotalTicketsSold} Total Sales: ${gruner2TotalTicketCost}</Card.Footer>
                                    </Card.Body>
                                    {Object.entries(ticketsData).map((group, index) => {
                                        console.log(group[1].ticketInfo.venue)
                                        if (group[1].ticketInfo.venue === "Gruner Brothers Brewing - May 18th")
                                            return (
                                                <Card key={`accord-${index}`} style={{width: '400px'}}>
                                                    <Card.Title>Card Holder: {group[1].payer.name.given_name} {group[1].payer.name.surname} </Card.Title>
                                                    <Card.Title>Number of Tickets: {group[1].ticketInfo.numberOfTickets}</Card.Title>
                                                    <Card.Title>Total Cost: {group[1].ticketInfo.totalCost}</Card.Title>
                                                    <Card.Body>
                                                        {/*<Card.Title>Guests:</Card.Title>*/}
                                                        {/*<Card.Title> {Object.entries(group[1].ticketInfo.ticketHolderNames).map((name, guestIndex) =>*/}
                                                        {/*{ return (*/}

                                                        {/*    <p key={guestIndex}>{guestIndex +1}: {name[1]}</p>*/}
                                                        {/*)*/}
                                                        {/*})}</Card.Title>*/}
                                                        {/*<Card.Title>{(() => {*/}
                                                        {/*    const glutenFreeCount = Object.values(group[1].ticketInfo.mealOptions)*/}
                                                        {/*        .filter(mealOption => mealOption).length;*/}
                                                        {/*    if (glutenFreeCount > 0) {*/}
                                                        {/*        return (*/}
                                                        {/*            <>*/}
                                                        {/*                Gluten free: {glutenFreeCount}*/}
                                                        {/*            </>*/}
                                                        {/*        )*/}
                                                        {/*    }*/}
                                                        {/*})()}</Card.Title>*/}
                                                    </Card.Body>

                                                </Card>
                                            )})}
                                </Accordion.Body>
                            </Accordion.Item>
                </Card>
            </Accordion>
        </div>
    );
};
export default Backstage