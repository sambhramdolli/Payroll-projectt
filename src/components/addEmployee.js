import React, { useState, useContext } from 'react';
import { EmployeeContext } from '../contexts/EmployeeContext'; 
import './addEmployee.css'; 

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [role, setRole] = useState('Employee'); // Default to Employee
  const [showPopup, setShowPopup] = useState(false);

  const { addEmployee } = useContext(EmployeeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = { name, email, project, role, experience: '0 years', skills: [] };
    addEmployee(newEmployee);

    setName('');
    setEmail('');
    setProject('');
    setRole('Employee');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="employee-form-container">
      <h1 className="employee-form-title">Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="employee-form-group">
          <input
            type="text"
            id="name"
            className="employee-input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name" className="employee-input-label">Name</label>
        </div>
        <div className="employee-form-group">
          <input
            type="email"
            id="email"
            className="employee-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" className="employee-input-label">Email</label>
        </div>
        <div className="employee-form-group">
          <select
            id="project"
            className="employee-input-field"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="" disabled>Select Project</option>
            <option value="Payroll">Payroll</option>
            <option value="XML">XML</option>
          </select>
          <label htmlFor="project" className="employee-input-label">Project</label>
        </div>
        <div className="employee-form-group">
          <select
            id="role"
            className="employee-input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" >Select Role</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA">QA</option>
          </select>
          <label htmlFor="role" className="employee-input-label">Role</label>
        </div>
        <button type="submit" className="employee-submit-button">Add Employee</button>
      </form>
      {showPopup && (
        <div className="popup">
          Employee added successfully!
        </div>
      )}
    </div>
  );
};

export default AddEmployee;


