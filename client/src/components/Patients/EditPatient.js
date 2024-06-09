import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import patientService from '../../services/PatientService';
import studyService from '../../services/StudyService';

const EditPatient = () => {
    const today = new Date().toISOString().split('T')[0];
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        gender: '',
        condition: '',
        recruitmentDate: '',
        selectedStudyId: '' 
    });
    const [recruitingStudies, setRecruitingStudies] = useState([]);

    useEffect(() => {
        fetchPatient();
        fetchRecruitingStudies(); 
    }, []);

    const fetchPatient = async () => {
        try {
            const data = await patientService.getById(id);
            // Convert the PatientID from string to integer
            const selectedStudyId = parseInt(data.patientID);
            // Update the patient state with the converted PatientID
            setPatient(prevState => ({
                ...prevState,
                ...data,
                selectedStudyId
            }));
        } catch (error) {
            console.error('Error fetching patient:', error);
        }
    };
    

    const fetchRecruitingStudies = async () => {
        try {
            const data = await studyService.fetchRecruitingStudies(); // Fetch recruiting studies from the backend
            setRecruitingStudies(data);
        } catch (error) {
            console.error('Error fetching recruiting studies:', error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Find the study object corresponding to the selected study ID
            const selectedStudyId = parseInt(patient.selectedStudyId); // Convert to number explicitly
            const selectedStudy = recruitingStudies.find(study => study.studyId === selectedStudyId);
            if (!selectedStudy) {
                throw new Error('Selected study not found');
            }
            else {
                // Pad the study ID to three digits and convert it to a string
                const patientID = String(selectedStudy.studyId).padStart(3, '0');
                // Construct the patientData object with updated patient details
                const patientData = {
                    name: patient.name,
                    age: patient.age,
                    gender: patient.gender,
                    condition: patient.condition,
                    recruitmentDate: patient.recruitmentDate,
                    patientID: patientID,
                    id:id
                };
                // Update patient details
                await patientService.update(id, patientData);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Patient details updated successfully!',
                    confirmButtonText: 'Go to Home Page'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });
            }
            
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name <span className="required">*</span></label>
                    <input type="text" name="name" value={patient.name} onChange={handleChange} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Age <span className="required">*</span></label>
                    <input type="number" name="age" value={patient.age} onChange={handleChange} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Gender <span className="required">*</span></label>
                    <select name="gender" value={patient.gender} onChange={handleChange} className="form-control" required>
                        <option value="" disabled>Please select one…</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-Binary</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Condition <span className="required">*</span></label>
                    <input type="text" name="condition" value={patient.condition} onChange={handleChange} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Recruitment Date<span className="required">*</span></label>
                    <input 
                        type="date" 
                        name="recruitmentDate" 
                        value={patient.recruitmentDate} 
                        onChange={handleChange} 
                        className="form-control"
                        max={today}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Avaliable Studies <span className="required">*</span></label>
                    <select name="selectedStudyId" value={patient.selectedStudyId} onChange={handleChange} className="form-control" required>
                        <option value="" disabled>Select a study...</option>
                        {recruitingStudies.map(study => (
                            <option key={study.studyId} value={study.studyId}>{study.title}</option>
                        ))}
                        {/* If selected study ID is not found in the recruiting studies data */}
                        {!recruitingStudies.some(study => study.studyId === patient.selectedStudyId) && (
                            <option value={patient.selectedStudyId}>Please select</option>
                        )}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPatient;
