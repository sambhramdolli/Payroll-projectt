import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import './Myteam.css';

const MyTeam = () => {
  const { manager, teamLeads, employees } = useContext(EmployeeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const handleBackToTeam = () => {
    setSelectedPerson(null);
  };

  const renderPerson = (person) => (
    <div className="profile-box" onClick={() => handlePersonClick(person)}>
      <img src={person.photo} alt={person.name} className="profile-photo" />
      <h3>{person.name}</h3>
      <p>{person.role}</p>
    </div>
  );

  return (
    <div className={`team-page ${selectedPerson ? 'employee-details-page' : 'main-team-page'}`}>
      <h1 className="team-heading">My Team</h1>
      {selectedPerson ? (
        <div className="employee-details">
          <img src={selectedPerson.photo} alt={selectedPerson.name} className="profile-photo" />
          <h2>{selectedPerson.name}</h2>
          <p>Role: {selectedPerson.role}</p>
          <p>Experience: {selectedPerson.experience}</p>
          <p>Skills: {selectedPerson.skills.join(', ')}</p>
          <button onClick={handleBackToTeam} className="back-button">
            Back to Team
          </button>
        </div>
      ) : (
        <div className="tree-structure">
          {manager && renderPerson(manager)}
          {teamLeads.map((lead) => (
            <div key={lead.id} className="tree-node">
              {renderPerson(lead)}
              <div className="subordinate-section">
                {employees
                  .filter((emp) => emp.role !== 'Manager' && emp.role !== 'Team Lead')
                  .map((employee) => (
                    renderPerson(employee)
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeam;
