import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditStudy = () => {
    const { studyId } = useParams();
    const navigate = useNavigate();
    const [study, setStudy] = useState({
        title: '',
        therapeutics: '',
        description: '',
        status: ''
    });

    useEffect(() => {
        fetchStudy();
    }, []);

    const fetchStudy = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/studies/${studyId}`);
            setStudy(response.data);
        } catch (error) {
            console.error('Error fetching study:', error);
        }
    };

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
            await axios.put(`${BASE_URL}/studies/${studyId}`, study);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Study details updated successfully!',
                confirmButtonText: 'Go back to All Studies'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/studies');
                }
            });
        } catch (error) {
            console.error('Error updating study:', error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Study</h2>
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
                        <option value="">Please select</option>
                        <option value="Recruiting">Recruiting</option>
                        <option value="Completed">Completed</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Terminated">Terminated</option>
                        <option value="Planning">Planning</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
        </div>
    );
};

export default EditStudy;
