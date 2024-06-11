import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import studyService from '../../services/StudyService';

const EditStudy = () => {
    const { studyId } = useParams();
    const navigate = useNavigate();
    const [study, setStudy] = useState({
        title: '',
        therapeutics: '',
        description: '',
        status: ''
    });
    //call the function to fetch the selected study 
    useEffect(() => {
        fetchStudy();
        // eslint-disable-next-line
    }, []);

    //function to fetch the study
    const fetchStudy = async () => {
        try {
            //get study by Id
            const fetchedStudy = await studyService.getById(studyId);
            setStudy(fetchedStudy);
        } catch (error) {
            console.error('Error fetching study:', error);
            navigate('/error');
        }
    };
    // handle state change
    const handleChange = e => {
        const { name, value } = e.target;
        setStudy(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    //save the current study
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await studyService.update(studyId, study);
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
            Swal.fire('Error', 'Failed to update study. Please try again later.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Edit Study</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Title <span className="required">*</span></label>
                            <input type="text" name="title" value={study.title} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Therapeutics <span className="required">*</span></label>
                            <input type="text" name="therapeutics" value={study.therapeutics} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group mb-3">
                            <label>Description <span className="required">*</span></label>
                            <textarea name="description" value={study.description} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group ">
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
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                        <button type="button" className="btn btn-secondary mt-3 cancelButton" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
    
};

export default EditStudy;
