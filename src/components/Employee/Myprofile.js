import React, { useState } from 'react';
import './Myprofile.css';
import { useNavigate } from 'react-router-dom';
import img2 from "../../assets/profile.png"; 

function EmployeeProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: 'John Doe',
    employeeId: '123456',
    emailId: 'john.doe@example.com',
    personalNumber: '9876543210',
    personalName: 'John Doe',
    bloodGroup: 'O+',
    nationality: 'American',
    state: 'California',
    permanentAddress: '1234 Elm Street, Springfield, CA',
    currentAddress: '5678 Oak Street, Springfield, CA',
    emergencyContact: {
      name: 'Jane Doe',
      mobileNumber: '1234567890',
      address: '1234 Elm Street, Springfield, CA',
      relation: 'Wife'
    },
    professionalBackground: {
      jobTitle: 'Software Engineer',
      companyName: 'Tech Company',
      educationQualification: 'B.Sc in Computer Science',
      certification: 'Certified Java Developer',
      skills: ['React', 'JavaScript', 'CSS'],
      socialMedia: {
        linkedin: 'https://www.linkedin.com/in/johndoe',
        twitter: 'https://www.twitter.com/johndoe'
      }
    }
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    if (section === 'emergencyContact' || section === 'professionalBackground') {
      setEmployeeInfo((prevInfo) => ({
        ...prevInfo,
        [section]: {
          ...prevInfo[section],
          [key]: value
        }
      }));
    } else {
      setEmployeeInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value
      }));
    }
  };

  const renderInput = (label, value, name) => (
    <div className="inputGroup">
      <label>{label}</label>
      {isEditing ? (
        <input type="text" name={name} value={value} onChange={handleChange} />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );

  const renderNestedInput = (label, value, section, key) => (
    <div className="inputGroup">
      <label>{label}</label>
      {isEditing ? (
        <input type="text" name={`${section}.${key}`} value={value} onChange={handleChange} />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );

  const handleBack = () => {
    navigate(0);
  };

  return (
    <div className="profileContainer">
      <div className="profileContent">
        <div className="leftSection">

        <div className="rightSection">
          <div className="profileImage">
            <img src={img2} alt="Profile" />
          </div>
          </div>

          <div className="profileSection">
            <h1 className='sectionHeader'>About Information</h1>
            {renderInput('Full Name:', employeeInfo.fullName, 'fullName')}
            {renderInput('Employee ID:', employeeInfo.employeeId, 'employeeId')}
            {renderInput('Email ID:', employeeInfo.emailId, 'emailId')}
          </div>
          <div className="profileSection">
            <h1 className='sectionHeader'>Personal Information</h1>
            {renderInput('Personal Number:', employeeInfo.personalNumber, 'personalNumber')}
            {renderInput('Personal Name:', employeeInfo.personalName, 'personalName')}
            {renderInput('Blood Group:', employeeInfo.bloodGroup, 'bloodGroup')}
            {renderInput('Nationality:', employeeInfo.nationality, 'nationality')}
            {renderInput('State:', employeeInfo.state, 'state')}
            {renderInput('Permanent Address:', employeeInfo.permanentAddress, 'permanentAddress')}
            {renderInput('Current Address:', employeeInfo.currentAddress, 'currentAddress')}
          </div>
          <div className="profileSection">
            <h1 className='sectionHeader'>Emergency Contact Details</h1>
            {renderNestedInput('Contact Name:', employeeInfo.emergencyContact.name, 'emergencyContact', 'name')}
            {renderNestedInput('Mobile Number:', employeeInfo.emergencyContact.mobileNumber, 'emergencyContact', 'mobileNumber')}
            {renderNestedInput('Address:', employeeInfo.emergencyContact.address, 'emergencyContact', 'address')}
            {renderNestedInput('Relation:', employeeInfo.emergencyContact.relation, 'emergencyContact', 'relation')}
          </div>
        </div>
        
          <div className="profileSection">
            <h1 className='sectionHeader'>Professional Background</h1>
            {renderNestedInput('Job Title:', employeeInfo.professionalBackground.jobTitle, 'professionalBackground', 'jobTitle')}
            {renderNestedInput('Company Name:', employeeInfo.professionalBackground.companyName, 'professionalBackground', 'companyName')}
            {renderNestedInput('Education Qualification:', employeeInfo.professionalBackground.educationQualification, 'professionalBackground', 'educationQualification')}
            {renderNestedInput('Certification:', employeeInfo.professionalBackground.certification, 'professionalBackground', 'certification')}
            {renderNestedInput('Skills:', employeeInfo.professionalBackground.skills.join(', '), 'professionalBackground', 'skills')}
            <div className="socialMedia">
              <label>Social Media</label>
              <ul>
                <li>
                  <a href={employeeInfo.professionalBackground.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
                <li>
                  <a href={employeeInfo.professionalBackground.socialMedia.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
              </ul>
            
          </div>
        </div>
      </div>

      <div className="buttonGroup">
        {isEditing ? (
          <>
            <button className="saveButton" onClick={handleSaveClick}>Save</button>
            <button className="cancelButton" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className="editButton" onClick={handleEditClick}>Edit</button>
        )}
        <button className="backButton" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default EmployeeProfile;

