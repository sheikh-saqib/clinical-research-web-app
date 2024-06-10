import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import patientService from '../../services/PatientService';
import studyService from '../../services/StudyService';
import { Collapse } from 'react-bootstrap';

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
    const [changeStudy, setChangeStudy] = useState(false);

    useEffect(() => {
        fetchRecruitingStudies();
    }, []);

    useEffect(() => {
        fetchPatient();
    }, [recruitingStudies]);

    const fetchPatient = async () => {
        try {
            const data = await patientService.getById(id);
            const selectedStudyId = parseInt(data.patientID);
            const studyExists = recruitingStudies.some(study => study.studyId === selectedStudyId);
            setPatient(prevState => ({
                ...prevState,
                ...data,
                selectedStudyId: studyExists ? selectedStudyId : ''
            }));
        } catch (error) {
            console.error('Error fetching patient:', error);
            navigate('/error');
        }
    };

    const fetchRecruitingStudies = async () => {
        try {
            const data = await studyService.fetchRecruitingStudies();
            setRecruitingStudies(data);
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

    const handleStudyChange = e => {
        const value = e.target.value === 'true';
        setChangeStudy(value);
        if (!value) {
            // Retain the previous study
            setPatient(prevState => ({
                ...prevState,
                selectedStudyId: prevState.patientID
            }));
        } else if (value && recruitingStudies.length === 0) {
            // Clear the selected study if there are no recruiting studies available
            setPatient(prevState => ({
                ...prevState,
                selectedStudyId: ''
            }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const selectedStudyId = parseInt(patient.selectedStudyId);
            const selectedStudy = recruitingStudies.find(study => study.studyId === selectedStudyId);

            const patientID = selectedStudy
                ? String(selectedStudy.studyId).padStart(3, '0')
                : String(patient.patientID).padStart(3, '0');

            const patientData = {
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                condition: patient.condition,
                recruitmentDate: patient.recruitmentDate,
                patientID: patientID,
                id: id
            };

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
        } catch (error) {
            console.error('Error updating patient:', error);
            navigate('/error');
        }
    };

    const handleCancel = () => {
        navigate(-1); // Navigate back one step in the history
    };

    return (
        <div className="container">
            <h2>Edit Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name <span className="required">*</span></label>
                    <input type="text" name="name" value={patient.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Age <span className="required">*</span></label>
                    <input type="number" name="age" value={patient.age} onChange={handleChange} className="form-control" required />
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
                    <input type="text" name="condition" value={patient.condition} onChange={handleChange} className="form-control" required />
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
                    <label>Change Study?</label><br />
                    <div>
                        <input
                            type="radio"
                            id="changeStudyYes"
                            name="changeStudy"
                            value="true"
                            checked={changeStudy === true}
                            onChange={handleStudyChange}
                        />
                        <label htmlFor="changeStudyYes">Yes</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="changeStudyNo"
                            name="changeStudy"
                            value="false"
                            checked={changeStudy === false}
                            onChange={handleStudyChange}
                        />
                        <label htmlFor="changeStudyNo">No</label>
                    </div>
                </div>
                <Collapse in={changeStudy === true}>
                    <div id="study-collapse">
                        {recruitingStudies.length === 0 ? (
                            <div className="alert alert-info" role="alert">
                                There are no available studies left, so the existing study will be assigned.
                            </div>
                        ) : (
                            <div className="form-group">
                                <label>Available Studies <span className="required">*</span></label>
                                <select name="selectedStudyId" value={patient.selectedStudyId} onChange={handleChange} className="form-control" required>
                                    <option value="" disabled>Select a study...</option>
                                    {recruitingStudies.map(study => (
                                        <option key={study.studyId} value={study.studyId}>{study.title}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </Collapse>
                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                <button type="button" className="btn btn-secondary mt-3 cancelButton" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPatient;
