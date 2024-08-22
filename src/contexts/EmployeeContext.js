import React, { createContext, useState } from 'react';

// Create the context
export const EmployeeContext = createContext();

// Create the provider component
export const EmployeeProvider = ({ children }) => {
  const [manager, setManager] = useState(null);
  const [teamLeads, setTeamLeads] = useState([]);
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    if (employee.role === 'Manager') {
      setManager(employee);
    } else if (employee.role === 'Team Lead') {
      setTeamLeads([...teamLeads, employee]);
    } else {
      setEmployees([...employees, employee]);
    }
  };

  return (
    <EmployeeContext.Provider value={{ manager, teamLeads, employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
