import React from 'react';
import './Employeehelp.css'; // Import CSS file for styles
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from "react-icons/io5";
const EmployeeHelp = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(0);
    };
    return (
        <div className="emp-help-menu">
            <h2 className='emp-help-title'>Help Menu</h2>
            <p className='emp-help-contact'>Contact Information:</p>
            <div className="emp-contact-info">
                <ul className="emp-help-list">
                    <li className="emp-help-list-item">Company Email: syliqonsoftware.com</li>
                    <li className="emp-help-list-item">HR Email: hr@syliqonsoftware.com</li>
                    <li className="emp-help-list-item">Manager Email: manager@syliqonsoftware.com</li>
                    <li className="emp-help-list-item">Team Leader Email: teamleader@syliqon.com</li>
                </ul>
            </div>
            <button className="emp-back-button" onClick={handleBack}> Back</button>
        </div>
    );
};
export default EmployeeHelp;

