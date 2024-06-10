import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import patientService from '../../services/PatientService';
import studyService from '../../services/StudyService';

const AddPatient = () => {
    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        gender: '',
        condition: '',
        recruitmentDate: '',
        selectedStudyTitle: '', 
        recruitingStudies: []
    });

    useEffect(() => {
        fetchRecruitingStudies(); 
    }, []);

    const fetchRecruitingStudies = async () => {
        try {
            const data = await studyService.fetchRecruitingStudies(); // Fetch recruiting studies from the backend
            setPatient(prevState => ({
                ...prevState,
                recruitingStudies: data
            }));
        } catch (error) {
            console.error('Error fetching recruiting studies:', error);
            navigate('/error');
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
            // Find the study object corresponding to the selected study title
            const selectedStudy = patient.recruitingStudies.find(study => study.title === patient.selectedStudyTitle);
            const patientID = String(selectedStudy.studyId).padStart(3, '0');

            const patientData = {
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                condition: patient.condition,
                recruitmentDate: patient.recruitmentDate,
                patientID: patientID
            };
            // Make the save call
            await patientService.create(patientData);
            Swal.fire('Success', 'Patient added successfully', 'success').then(() => {
                navigate('/');
            });
        } catch (error) {
            console.error('Error adding patient:', error);
            Swal.fire('Error', 'Failed to add patient. Please try again later.', 'error');
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name <span className="required">*</span></label>
                            <input type="text" name="name" value={patient.name} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Age <span className="required">*</span></label>
                            <input type="number" name="age" value={patient.age} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Condition <span className="required">*</span></label>
                            <input type="text" name="condition" value={patient.condition} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Recruitment Date <span className="required">*</span></label>
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
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Available Studies <span className="required">*</span></label>
                            <select name="selectedStudyTitle" value={patient.selectedStudyTitle} onChange={handleChange} className="form-control" required>
                                <option value="" disabled>Select a study...</option>
                                {patient.recruitingStudies.map(study => (
                                    <option key={study.studyId} value={study.title}>{study.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary me-2">Add Patient</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPatient;
