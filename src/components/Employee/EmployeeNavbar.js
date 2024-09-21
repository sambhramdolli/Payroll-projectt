import React, { useState, useEffect, useRef } from 'react';
import '../Employee/EmployeeNavbar.css';
import { IoIosPersonAdd } from "react-icons/io";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaHandsHelping, FaPrescription } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import img1 from "../../assets/image (2).png";
import img2 from "../../assets/profile.png";

const EmployeeNavBar = ({ onButtonClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState({
    profile: false,
  });

  const dropdownRefs = {
    profile: useRef(null),
  };

  const toggleDropdown = (type) => {
    setDropdownVisible(prev => ({
      ...prev,
      [type]: !prev[type],
      ...Object.keys(dropdownVisible).reduce((acc, key) => {
        if (key !== type) acc[key] = false;
        return acc;
      }, {}),
    }));
  };

  const handleOutsideClick = (event) => {
    Object.keys(dropdownRefs).forEach(key => {
      if (dropdownVisible[key] && dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
        setDropdownVisible(prev => ({ ...prev, [key]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <nav className="employee-navbar">
      <div className="employee-navbar__logo-container">
        <img src={img1} alt="Logo" className='employee-navbar__logo' />
      </div>

      <div className='employee-navbar__nav'>
        <div className="employee-navbar__raise-ticket" onClick={() => onButtonClick('raiseticket')}>
          <p className='employee-navbar__raise-ticket-label'>Raise Ticket</p>
        </div>

        <div className="employee-navbar__clock-in" onClick={() => onButtonClick('clockin')}>
          <img src="https://img.icons8.com/?size=100&id=82767&format=png&color=070A61" alt="Clock In" className='employee-navbar__clock-in-icon' />
          <p className='employee-navbar__clock-in-label'>ClockIn&Out</p>
        </div>

        <div className="employee-navbar__profile-icon" onClick={() => toggleDropdown('profile')} ref={dropdownRefs.profile}>
          <img src={img2} alt="Profile" className="employee-navbar__profile-image" />
          {dropdownVisible.profile && (
            <div className="employee-navbar__profile-dropdown">
              <button className="employee-navbar__profile-item" onClick={() => onButtonClick('myprofile')}>
                <IoIosPersonAdd className='employee-navbar__icon' />
                My Profile
              </button>
              <button className="employee-navbar__profile-item" onClick={() => onButtonClick('employeeresignation')}>
                <FaPrescription className='employee-navbar__icon' />
                Resignation
              </button>
              <button className="employee-navbar__profile-item" onClick={() => onButtonClick('employeesetting')}>
                <IoSettings className='employee-navbar__icon' />
                Settings
              </button>
              <button className="employee-navbar__profile-item" onClick={() => onButtonClick('employeehelp')}>
                <FaHandsHelping className='employee-navbar__icon' />
                Help
              </button>
              <button className="employee-navbar__profile-item" onClick={() => onButtonClick('employeelogout')}>
                <RiLogoutCircleFill className='employee-navbar__icon' />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavBar;
