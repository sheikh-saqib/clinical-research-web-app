import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api/api';
import Swal from 'sweetalert2';

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
            await axios.post(`${BASE_URL}/patients`, patient);
            Swal.fire('Success', 'Patient added successfully', 'success').then(() => {
                navigate('/');
            });
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    // Get today's date in yyyy-mm-dd format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container">
            <h2>Add Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={patient.name} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" value={patient.age} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <input type="text" name="gender" value={patient.gender} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Condition:</label>
                    <input type="text" name="condition" value={patient.condition} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Recruitment Date:</label>
                    <input 
                        type="date" 
                        name="recruitmentDate" 
                        value={patient.recruitmentDate} 
                        onChange={handleChange} 
                        className="form-control"
                        max={today} // Block future dates
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Patient</button>
            </form>
        </div>
    );
};

export default AddPatient;
