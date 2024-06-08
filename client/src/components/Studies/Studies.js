import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/api';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners'; // Importing the loader

const Studies = () => {
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/studies`);
            setStudies(response.data);
        } catch (error) {
            console.error('Error fetching studies:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

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
                await axios.delete(`${BASE_URL}/studies/${studyId}`);
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
            <Link to="/add-study">
                <Button variant="success" className="mb-3">Add Study</Button>
            </Link>
            <div>
                {loading ? ( // Conditional rendering based on loading state
                    <div className="text-center">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : (
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th className="border">StudyID</th>
                                <th className="border">Title</th>
                                <th className="border">Therapeutics</th>
                                <th className="border">Description</th>
                                <th className="border">Status</th>
                                <th colSpan={2} className="text-center border">Actions</th>
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
