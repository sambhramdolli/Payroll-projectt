import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './Employee.css';
import Employeesidebar from './Employeesidebar';
import EmployeeNavBar from '../Employee/EmployeeNavbar';
import LeaveApplication from './LeaveApplication';
import SalaryReport from '../SalaryReport';
import ImageSlider from '../ImageSlider';
import MyProfile from './Myprofile';
import EmployeeResignation from './EmployeeResignation';
import EmployeeSetting from './EmployeeSetting';
import Employeehelp from './Employeehelp';
import Employeelogout from './Employeelogout';
import RaiseTicket from './Employee Tickets/Raiseticket';
import Employeeclock from './Employeeclock';
import HolidayList from '../Holiday';
import Myteam from './Myteam';

const Employee = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const addTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  const handleButtonClick = (route) => {
    navigate(`/employee/${route}`);
  };

  return (
    <main>
      <EmployeeNavBar onButtonClick={handleButtonClick} />
      <ImageSlider />
      <div className="employee-page">
        <Employeesidebar />
        <div className="content">
          <Routes>
            <Route path="leave" element={<LeaveApplication />} />
            <Route path="salary-reports" element={<SalaryReport />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="employeeresignation" element={<EmployeeResignation />} />
            <Route path="employeesetting" element={<EmployeeSetting />} />
            <Route path="employeehelp" element={<Employeehelp />} />
            <Route path="employeelogout" element={<Employeelogout />} />
            <Route path="raiseticket" element={<RaiseTicket addTicket={addTicket} />} />
            <Route path="clockin" element={<Employeeclock tickets={tickets} />} />
            <Route path="holiday" element={<HolidayList />} />
            <Route path="myteam" element={<Myteam />} />
            <Route path="/" element={<div>Welcome to the Employee Dashboard</div>} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default Employee;
