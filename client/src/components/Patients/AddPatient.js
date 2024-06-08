import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import patientService from '../../services/PatientService';

const AddPatient = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        gender: '',
        condition: '',
        recruitmentDate: ''
    });

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
            await patientService.create(patient);
            Swal.fire('Success', 'Patient added successfully', 'success').then(() => {
                navigate('/');
            });
        } catch (error) {
            console.error('Error adding patient:', error);
            Swal.fire('Error', 'Failed to add patient. Please try again later.', 'error');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container">
            <h2>Add Patient</h2>
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
                <button type="submit" className="btn btn-primary mt-3">Add Patient</button>
            </form>
        </div>
    );
};

export default AddPatient;
