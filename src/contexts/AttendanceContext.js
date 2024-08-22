import React, { createContext, useContext, useState } from 'react';
const AttendanceContext = createContext();
export const useAttendance = () => useContext(AttendanceContext);
export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);
  const addClockIn = (employeeId, time) => {
    setAttendance(prev => [...prev, { employeeId, time, type: 'Clock In' }]);
  };
  const addClockOut = (employeeId, time) => {
    setAttendance(prev => [...prev, { employeeId, time, type: 'Clock Out' }]);
  };
  const getAttendanceForDate = (date) => {
    return attendance.filter(entry => new Date(entry.time).toDateString() === date.toDateString());
  };
  return (
    <AttendanceContext.Provider value={{ addClockIn, addClockOut, getAttendanceForDate }}>
      {children}
    </AttendanceContext.Provider>
  );
};