import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../../contexts/TicketContext'; // Import TicketContext
import StatusPage from './AdminStatusPage';
import { IoReturnDownBackSharp } from "react-icons/io5";
import { SiStatuspage } from "react-icons/si";
import './AdminResignation.css';
function AdminResignation() {
  const [name] = useState('naveed');
  const [id] = useState('SS030');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [domain, setDomain] = useState('');
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [status, setStatus] = useState('pending');
  const { addTicket } = useContext(TicketContext); // Access addTicket from context
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a new ticket object
    const newTicket = {
      id,
      name,
      supportTeam: domain,
      reason: reasonForLeaving,
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
      setStatus('submitted');
      setShowStatusPage(true);
    } catch (error) {
      toast.error('Failed to submit resignation.');
      console.error('Error submitting resignation:', error);
    }
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
  const handleBack = () => {
    navigate(0);
  };
  const handleStatusCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
      setStatus(response.data.status);
      setShowStatusPage(true); // Set showStatusPage to true to display the StatusPage
      toast.success('Status updated.');
    } catch (error) {
      toast.error('Failed to check status.');
      console.error('Error checking status:', error);
    }
  };
  return (
    <div className="admin-resignation-container">
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
      {!showStatusPage ? (
        <div className="admin-form-container">
          <div className="admin-status-check-icon" onClick={handleStatusCheck}>
            <SiStatuspage />
          </div>
          <h2 className='admin-heading'>Resignation Application Form</h2>
          <div className="admin-employee-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>ID Number:</strong> {id}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <h3 htmlFor="reasonForLeaving" className='reason-title'>Reason for Leaving:</h3>
              <textarea
                id="reasonForLeaving"
                value={reasonForLeaving}
                onChange={(e) => setReasonForLeaving(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-buttons">
              <button type="button" className="admin-button admin-button-discuss" onClick={handleDiscussWithManager}>Discuss with Manager</button>
              <button type="button" className="admin-button admin-button-back" onClick={handleBack}><IoReturnDownBackSharp /></button>
              <button type="submit" className="admin-button admin-button-submit">Proceed</button>
            </div>
          </form>
        </div>
      ) : (
        <StatusPage />
      )}
    </div>
  );
}
export default AdminResignation;