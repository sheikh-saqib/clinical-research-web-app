import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader';
import studyService from '../../services/StudyService';

const Studies = () => {
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        //call the function to get the study data
        fetchStudies();
        // eslint-disable-next-line
    }, []);
    //fetch study data from backend
    const fetchStudies = async () => {
        try {
            const data = await studyService.getAll();
            setStudies(data);
        } catch (error) {
            console.error('Error fetching studies:', error);
            navigate('/error');
        } finally {
            setLoading(false);
        }
    };
    // delete study data from backend
    const handleDelete = async (studyId) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                await studyService.delete(studyId);
                //reset the study list
                setStudies(studies.filter(study => study.studyId !== studyId));
                Swal.fire('Deleted!', 'The study has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'The study is safe :)', 'info');
            }
        } catch (error) {
            console.error('Error deleting study:', error);
            Swal.fire('Error', 'Failed to delete study. Please try again later.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Study Details</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link to="/add-study">
                        <Button variant="success">Add Study</Button>
                    </Link>
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="text-center">
                        <ClipLoader size={50} loading={loading} />
                    </div>
                ) : (
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th className="border text-center align-middle">StudyID</th>
                                <th className="border text-center align-middle">Title</th>
                                <th className="border text-center align-middle">Therapeutics</th>
                                <th className="border text-center align-middle">Description</th>
                                <th className="border text-center align-middle">Status</th>
                                <th colSpan={2} className="text-center align-middle border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studies.map(study => (
                                <tr key={study.studyId}>
                                    <td className="border bold">{study.studyId}</td>
                                    <td className="border">{study.title}</td>
                                    <td className="border">{study.therapeutics}</td>
                                    <td className="border">{study.description}</td>
                                    <td className="border">{study.status}</td>
                                    <td className="text-right">
                                        <Link to={`/edit-study/${study.studyId}`} className="btn btn-primary">Edit</Link>
                                    </td>
                                    <td className="border-right">
                                        <button
                                            onClick={() => handleDelete(study.studyId)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default Studies;
