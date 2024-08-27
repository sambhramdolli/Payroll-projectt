import React, { useContext, useRef } from 'react';
import './Tickets.css';
import { TicketContext } from '../contexts/TicketContext'; // Import TicketContext
const Ticket = () => {
    const { tickets } = useContext(TicketContext); // Access tickets from context
    const ticketsContainerRef = useRef(null);
    const scrollToTop = () => {
        if (ticketsContainerRef.current) {
            ticketsContainerRef.current.scrollTop = 0;
        }
    };
    return (
        <div className="my-tickets">
            <h1>My Tickets</h1>
            <p className='sds'>Total Tickets: {tickets.length}</p>
            <div className="tickets-container" ref={ticketsContainerRef}>
                {tickets.map((ticket) => (
                    <div className="ticket-card" key={ticket.id}>
                        <p><strong>ID:</strong> {ticket.id}</p>
                        <p><strong>Support Team:</strong> {ticket.supportTeam}</p>
                        <p><strong>Reason:</strong> {ticket.reason}</p>
                        <p><strong>Description:</strong> {ticket.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Ticket;