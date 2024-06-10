import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link ,useNavigate} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import patientService from '../../services/PatientService';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const data = await patientService.getAll();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            navigate('/error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
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
                await patientService.delete(id);
                setPatients(patients.filter(patient => patient.id !== id));
                Swal.fire('Deleted!', 'The patient has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'The patient is safe :)', 'info');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            Swal.fire('Error', 'Failed to delete patient. Please try again later.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Patient Details</h2>
            <div className="row">
                <div className="col">
                    <div>
                        {loading ? (
                            <div className="text-center">
                                <ClipLoader size={50} loading={loading} />
                            </div>
                        ) : (
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="border">PatientId</th>
                                        <th className="border">Name</th>
                                        <th className="border">Age</th>
                                        <th className="border">Gender</th>
                                        <th className="border">Condition</th>
                                        <th className="border">StudyId</th>
                                        <th className="border">Recruitment Date</th>
                                        <th colSpan={2} className="text-center border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map(patient => (
                                        <tr key={patient.id}>
                                            <td className="border bold">{patient.id}</td>
                                            <td className="border">{patient.name}</td>
                                            <td className="border">{patient.age}</td>
                                            <td className="border">{patient.gender}</td>
                                            <td className="border">{patient.condition}</td>
                                            <td className="border bold">{parseInt(patient.patientID)}</td>
                                            <td className="border">{patient.recruitmentDate}</td>
                                            <td className="text-right">
                                                <Link to={`/edit/${patient.id}`} className="btn btn-primary">Edit</Link>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(patient.id)}
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
            </div>
        </div>
    );
    
};

export default Patients;
