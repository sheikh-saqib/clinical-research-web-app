import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import studyService from '../../services/StudyService';

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
            await studyService.create(study);
            Swal.fire('Success', 'Study added successfully', 'success').then(() => {
                navigate('/studies');
            });
        } catch (error) {
            console.error('Error adding study:', error);
            Swal.fire('Error', 'Failed to add study. Please try again later.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Add Study</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 form-group mb-3">
                        <label>Title <span className="required">*</span></label>
                        <input type="text" name="title" value={study.title} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                        <label>Therapeutics <span className="required">*</span></label>
                        <input type="text" name="therapeutics" value={study.therapeutics} onChange={handleChange} className="form-control" required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 form-group mb-3">
                        <label>Description <span className="required">*</span></label>
                        <textarea name="description" value={study.description} onChange={handleChange} className="form-control" required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 form-group mb-3">
                        <label>Status <span className="required">*</span></label>
                        <select name="status" value={study.status} onChange={handleChange} className="form-control" required>
                            <option value="" disabled>Please select</option>
                            <option value="Recruiting">Recruiting</option>
                            <option value="Completed">Completed</option>
                            <option value="Withdrawn">Withdrawn</option>
                            <option value="Terminated">Terminated</option>
                            <option value="Planning">Planning</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary me-2">Add Study</button>
                        <button type="button" className="btn btn-secondary " onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default AddStudy;
