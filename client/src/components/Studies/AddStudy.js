import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../api/api';
import Swal from 'sweetalert2';

const AddStudy = () => {
    const navigate = useNavigate();
    const [study, setStudy] = useState({
        title: '',
        therapeutics: '',
        description: '',
        status: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setStudy(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/studies`, study);
            Swal.fire('Success', 'Study added successfully', 'success').then(() => {
                navigate('/studies');
            });
        } catch (error) {
            console.error('Error adding study:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add Study</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" name="title" value={study.title} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Therapeutics <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" name="therapeutics" value={study.therapeutics} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Description <span style={{ color: 'red' }}>*</span></label>
                    <textarea name="description" value={study.description} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Status <span style={{ color: 'red' }}>*</span></label>
                    <select name="status" value={study.status} onChange={handleChange} className="form-control" required>
                        <option value="" disabled>Please select</option>
                        <option value="Recruiting">Recruiting</option>
                        <option value="Completed">Completed</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Terminated">Terminated</option>
                        <option value="Planning">Planning</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Study</button>
            </form>
        </div>
    );
};

export default AddStudy;
