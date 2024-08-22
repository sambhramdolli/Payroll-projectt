import React, { useState } from 'react';
import './Employeesidebar.css';

const Employeesidebar = ({ onButtonClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar11 ${isDropdownOpen ? 'show-dropdown11' : ''}`}>
      <div 
        className="vertical-bar11"
        onClick={handleIconClick}
      >
        <img src="https://img.icons8.com/?size=100&id=8951&format=png&color=FFFFFF" alt="Conference Icon" className="vertical-bar-icon11" />
        <img src="https://img.icons8.com/?size=100&id=34401&format=png&color=FFFFFF" alt="Cash In Hand Icon" className="vertical-bar-icon11" />
        <img src="https://img.icons8.com/?size=100&id=qaDBSQJh1PHW&format=png&color=FFFFFF" alt="Leave House Icon" className="vertical-bar-icon11" />
        <img src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=FFFFFF" alt="Checked User Male Icon" className="vertical-bar-icon11" />
      </div>
      <div 
        className="dropdown-content11"
      >
        <button className="button44" onClick={() => onButtonClick('myteam')}>MY TEAM</button>
        <button className="button55" onClick={() => onButtonClick('salaryReports')}>PAY SLIPS</button>
        <button className="button66" onClick={() => onButtonClick('leave')}>TIME OFF</button>
        <button className="button77" onClick={() => onButtonClick('Holiday')}>HOLIDAY CALENDAR</button>
      </div>
    </div>
  );
};

export default Employeesidebar;
