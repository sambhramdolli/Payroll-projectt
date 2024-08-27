import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoReturnDownBackSharp } from "react-icons/io5";
import { SiStatuspage } from "react-icons/si";
import { TicketContext } from '../../contexts/TicketContext'; // Import TicketContext
import './EmployeeResignation.css';
import { useNavigate } from 'react-router-dom';
function EmployeeResignation() {
  const [name] = useState('John Doe');
  const [id] = useState('123456');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [domain, setDomain] = useState('');
  const { addTicket } = useContext(TicketContext);
   // Access addTicket from context
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a new ticket object
    const newTicket = {
      id,
      name,
      supportTeam: domain,
      reason: reasonForLeaving,
      priority: 'Normal', // or other appropriate priority level
      description: `Resignation submitted by ${name} for domain ${domain}. Reason: ${reasonForLeaving}`,
    };
    // Store the new ticket in the TicketContext
    addTicket(newTicket);
    try {
      await axios.post('http://localhost:5000/send-resignation', {
        name,
        id,
        domain,
        reason: reasonForLeaving,
        managerEmail: 'sharathachar55@gmail.com'
      });
      toast.success('Resignation submitted successfully.');
    } catch (error) {
      toast.error('Failed to submit resignation.');
      console.error('Error submitting resignation:', error);
    }
  };
  const handleBack = () => {
    navigate(0);
  };
  const handleDiscussWithManager = async () => {
    try {
      await axios.post('http://localhost:5000/send-discussion-notification', {
        name,
        id,
        managerEmail: 'sharathachar55@gmail.com'
      });
      toast.success('Notification sent to manager for discussion.');
    } catch (error) {
      toast.error('Failed to send notification.');
      console.error('Error sending notification:', error);
    }
  };
  return (
    <div className="resignation-container1">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="form-container12">
        <div className="status-check-icon">
          <SiStatuspage />
        </div>
        <h2 className='thg'>Resignation Application Form</h2>
        <div className="employee-details">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>ID Number:</strong> {id}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3><label htmlFor="reasonForLeaving">Reason for Leaving:</label></h3>
            <textarea
              id="reasonForLeaving"
              value={reasonForLeaving}
              onChange={(e) => setReasonForLeaving(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="button" className="button button-discuss" onClick={handleDiscussWithManager}>Discuss with Manager</button>
            <button type="button" className="button button-back" onClick={handleBack}><IoReturnDownBackSharp /></button>
            <button type="submit" className="button button-submit">Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EmployeeResignation;