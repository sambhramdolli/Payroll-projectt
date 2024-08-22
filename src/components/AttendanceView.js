import React, { useState, useEffect } from 'react';
import './AttendanceView.css';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../contexts/AttendanceContext';

const AttendanceView = ({ employees = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { getAttendanceForDate } = useAttendance();
    const navigate = useNavigate();

    useEffect(() => {
        if (dateFrom && dateTo) {
            const startDate = new Date(dateFrom);
            const endDate = new Date(dateTo);
            const result = employees.map(employee => {
                const attendanceDates = [];
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    const dayHistory = getAttendanceForDate(d, employee.id);
                    if (dayHistory && dayHistory.length > 0) {
                        attendanceDates.push({
                            date: formatDate(d),
                            entries: dayHistory
                        });
                    }
                }
                return { ...employee, attendance: attendanceDates };
            });
            setFilteredData(result);
        } else {
            setFilteredData([]); // Reset if no date is selected
        }
    }, [dateFrom, dateTo, employees, getAttendanceForDate]);

    const handleSearch = () => {
        if (searchTerm) {
            const searchResults = employees.filter(employee =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(searchResults.length > 0 ? searchResults : []);
        } else {
            setFilteredData([]); // Reset if no search term
        }
    };

    const handleGenerateCSV = () => {
        let csvContent = 'Employee ID,Employee Name,Department,Date,Clock In,Clock Out,Total Hours,Manager\n';

        filteredData.forEach(employee => {
            if (employee.attendance && employee.attendance.length > 0) {
                employee.attendance.forEach(record => {
                    const clockIn = record.entries.find(entry => entry.type === 'Clock In');
                    const clockOut = record.entries.find(entry => entry.type === 'Clock Out');
                    const totalHours = clockIn && clockOut ? formatTimeDifference(clockOut.time, clockIn.time) : '---';

                    csvContent += `${employee.id},${employee.name},${employee.department},${record.date},`;
                    csvContent += `${clockIn ? formatTime(clockIn.time) : '---'},`;
                    csvContent += `${clockOut ? formatTime(clockOut.time) : '---'},`;
                    csvContent += `${totalHours},${employee.manager}\n`;
                });
            } else {
                csvContent += `${employee.id},${employee.name},${employee.department},No attendance records found\n`;
            }
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString();
    };

    const formatTimeDifference = (end, start) => {
        const totalSeconds = (new Date(end) - new Date(start)) / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="attendance-view">
            <h1>Attendance View</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by employee name"
                />
                {/* <button onClick={handleSearch}>Search</button> */}
            </div>
            <div className="date-filters">
                <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
                <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                />
            </div>
            {filteredData.length > 0 ? (
                <div className="attendance-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Total Hours</th>
                                <th>Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((employee, index) =>
                                employee.attendance.map((record, recordIndex) => (
                                    <tr key={`${index}-${recordIndex}`}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.department}</td>
                                        <td>{record.date}</td>
                                        <td>
                                            {record.entries.filter(entry => entry.type === 'Clock In').map((entry, entryIndex) => (
                                                <div key={entryIndex}>{formatTime(entry.time)}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {record.entries.filter(entry => entry.type === 'Clock Out').map((entry, entryIndex) => (
                                                <div key={entryIndex}>{formatTime(entry.time)}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {record.entries.length >= 2 ?
                                                formatTimeDifference(record.entries.find(entry => entry.type === 'Clock Out').time,
                                                    record.entries.find(entry => entry.type === 'Clock In').time) : '---'}
                                        </td>
                                        <td>{employee.manager}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <button onClick={handleGenerateCSV}>Generate CSV</button>
                </div>
            ) : (
                <p>No data found</p>
            )}
            <button onClick={() => navigate(0)}>Back</button>
        </div>
    );
};

export default AttendanceView;
