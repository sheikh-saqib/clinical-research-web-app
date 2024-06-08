import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import patientService from '../../services/PatientService';

const EditPatient = () => {
    const today = new Date().toISOString().split('T')[0];
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        gender: '',
        condition: '',
        recruitmentDate: ''
    });

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const data = await patientService.getById(id);
            setPatient(data);
        } catch (error) {
            console.error('Error fetching patient:', error);
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
            await patientService.update(id, patient);
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
                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPatient;
