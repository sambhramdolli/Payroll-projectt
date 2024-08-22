import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAttendance } from '../../contexts/AttendanceContext';
import './Employeeclock.css';

const Atta = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalHours, setTotalHours] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayHistory, setDisplayHistory] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);

  const navigate = useNavigate();
  const { addClockIn, addClockOut, getAttendanceForDate } = useAttendance();

  const employeeDetails = {
    id: 'SS022',
    name: 'Shahbaz',
    teamLead: 'Kamal',
    manager: 'Ramesh',
    number: '7075745143'
  };

  useEffect(() => {
    const history = getAttendanceForDate(selectedDate);
    setDisplayHistory(history);
  }, [selectedDate, getAttendanceForDate]);

  useEffect(() => {
    if (clockedIn && startTime) {
      const intervalId = setInterval(() => {
        setEndTime(new Date());
        const totalSeconds = (new Date() - startTime) / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        setTotalHours(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [clockedIn, startTime]);

  const handleClockIn = () => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      if (displayHistory.some(entry => entry.type === 'Clock In')) {
        alert('You have already clocked in today.');
        return;
      }
      setClockedIn(true);
      const start = new Date();
      setStartTime(start);
      setEndTime(null);
      setTotalHours(null);
      addClockIn(start, start);
    }
  };

  const handleClockOut = () => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      if (!displayHistory.some(entry => entry.type === 'Clock In')) {
        alert('You need to clock in before you can clock out.');
        return;
      }
      if (displayHistory.some(entry => entry.type === 'Clock Out')) {
        alert('You have already clocked out today.');
        return;
      }
      setClockedIn(false);
      const end = new Date();
      setEndTime(end);
      const totalSeconds = (end - startTime) / 1000;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      setTotalHours(`${hours}h ${minutes}m ${seconds}s`);
      addClockOut(end, end);
    }
  };

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--';
  };


  const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
  return `${day}/${month}/${year}`;
};

const downloadReport = () => {
  // Format the header row
  let csvContent = 'Employee ID,Employee Name,Department,Date,Clock In,Clock Out,Total Hours,Manager\n';

  // Create a map to hold clock-in and clock-out data
  const attendanceMap = {};

  // Populate the map with clock-in and clock-out times
  displayHistory.forEach(entry => {
    const dateStr = formatDate(new Date(entry.time));
    if (entry.type === 'Clock In') {
      attendanceMap[dateStr] = { ...attendanceMap[dateStr], clockIn: formatTime(new Date(entry.time)) };
    } else if (entry.type === 'Clock Out') {
      attendanceMap[dateStr] = { ...attendanceMap[dateStr], clockOut: formatTime(new Date(entry.time)) };
    }
  });

  // Calculate total hours and build the CSV content
  Object.keys(attendanceMap).forEach(dateStr => {
    const { clockIn, clockOut } = attendanceMap[dateStr];
    let totalHours = '';

    if (clockIn && clockOut) {
      const [day, month, year] = dateStr.split('/').map(num => parseInt(num, 10));
      const clockInTime = new Date(year + 2000, month - 1, day, ...clockIn.split(':').map(num => parseInt(num, 10)));
      const clockOutTime = new Date(year + 2000, month - 1, day, ...clockOut.split(':').map(num => parseInt(num, 10)));

      const totalSeconds = (clockOutTime - clockInTime) / 1000;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      totalHours = `${hours}h ${minutes}m ${seconds}s`;
    }

    // Append row to CSV content
    csvContent += `${employeeDetails.id},${employeeDetails.name},${employeeDetails.teamLead},${dateStr},${clockIn || ''},${clockOut || ''},${totalHours},${employeeDetails.manager}\n`;
  });

  // Create a blob for the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Attendance_Report_${formatDate(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

 
  
  






  

  const handleViewDetails = () => {
    setViewDetails(true);
  };

  const handleBack = () => {
    navigate(0);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Attendance</h1>
        <div className="date-picker-container">
          <span className="calendar-icon">📅</span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="date-picker"
          />
        </div>
      </div>
      {viewDetails ? (
        <div className="history">
          <h4>Attendance History</h4>
          <div className="employee-details">
            <p>Employee ID: {employeeDetails.id}</p>
            <p>Employee Name: {employeeDetails.name}</p>
            <p>Team Lead: {employeeDetails.teamLead}</p>
            <p>Manager: {employeeDetails.manager}</p>
            <p>Contact Number: {employeeDetails.number}</p>
            <button className="download-btn" onClick={downloadReport}>Download Report</button>
          </div>
          <div className="history-list">
            {displayHistory.length > 0 ? (
              displayHistory.map((entry, index) => (
                <p key={index}>{entry.type} at {formatTime(new Date(entry.time))}</p>
              ))
            ) : (
              <p>No data found</p>
            )}
            <button className="back-btn" onClick={handleBack}>Back</button>
          </div>
        </div>
      ) : (
        <div className="clock-in-out">
          <button
            className={`clock-btn ${clockedIn ? 'clocked-in' : ''}`}
            onClick={clockedIn ? handleClockOut : handleClockIn}
          >
            {clockedIn ? 'Clock Out' : 'Clock In'}
          </button>
          <div className="status">
            <div className="status-box">
              <span>Clock In Time:</span>
              <span>{formatTime(startTime)}</span>
            </div>
            <div className="status-box">
              <span>Clock Out Time:</span>
              <span>{formatTime(endTime)}</span>
            </div>
            {totalHours && (
              <div className="status-box">
                <span>Total Hours:</span>
                <span>{totalHours}</span>
              </div>
            )}
          </div>
          <button className="view-details-btn" onClick={handleViewDetails}>View Details</button>
          <button className="back-btn" onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  );
};

export default Atta;
