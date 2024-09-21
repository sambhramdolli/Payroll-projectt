import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IoIosPersonAdd } from "react-icons/io";
import { RiArrowDropDownLine, RiLogoutCircleFill } from "react-icons/ri";
import { FaHandsHelping, FaPrescription } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import logoImage from "../assets/image (2).png"; // Your logo image
import profileImage from "../assets/profile.png"; // Your profile image
import homeButton from "../assets/homeButton.png"; 

const NavBar = ({ onButtonClick, onHomeClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState({
    profile: false,
    recruitment: false,
  });

  const dropdownRefs = {
    profile: useRef(null),
    recruitment: useRef(null),
  };

  const toggleDropdown = (type) => {
    setDropdownVisible(prev => ({
      ...prev,
      [type]: !prev[type],
      ...Object.keys(dropdownVisible).reduce((acc, key) => {
        if (key !== type) acc[key] = false; // Close other dropdowns
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
    <nav className="navBar">
      <div className="navBar-logoContainer">
        <img src={logoImage} alt="Logo" className='navBar-logo' />
      </div>
      

      <div className='navBar-nav'>
        {/* Recruitment Dropdown */}
        <div className="navBar-dropdownToggle" onClick={() => toggleDropdown('recruitment')} ref={dropdownRefs.recruitment}>
          <div className='navBar-dropdownHeader'>
            <p className='navBar-dropdownTitle'>Recruitment</p>
            <RiArrowDropDownLine className='navBar-dropdownIcon' />
          </div>
          {dropdownVisible.recruitment && (
            <div className='navBar-dropdownMenu'>
              <button className="navBar-menuItem" onClick={() => onButtonClick('interviewscheduling')}>
                Interview Schedule
              </button>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="navBar-dropdownToggle" onClick={() => toggleDropdown('profile')} ref={dropdownRefs.profile}>
          <img src={profileImage} alt="Profile" className='navBar-profileImage' />
          {dropdownVisible.profile && (
            <div className="navBar-profileDropdownMenu">
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminprofile')}>
                <IoIosPersonAdd className='navBar-profileIcon' />
                My Profile
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminresignation')}>
                <FaPrescription className='navBar-profileIcon' />
                Resignation
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminsettings')}>
                <IoSettings className='navBar-profileIcon' />
                Settings
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminhelp')}>
                <FaHandsHelping className='navBar-profileIcon' />
                Help
              </Link>
              <Link className="navBar-profileMenuItem" to="#" onClick={() => onButtonClick('adminlogout')}>
                <RiLogoutCircleFill className='navBar-profileIcon' />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
