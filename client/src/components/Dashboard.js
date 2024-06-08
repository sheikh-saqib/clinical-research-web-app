import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/api';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/patients`);
            const sortedPatients = response.data.sort((a, b) => {
                return new Date(a.recruitmentDate) - new Date(b.recruitmentDate);
            });
            setPatients(sortedPatients);
        } catch (error) {
            console.error('Error fetching patients:', error);
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
                // User confirmed deletion
                await axios.delete(`${BASE_URL}/patients/${id}`);
                // Update state to remove the deleted patient
                setPatients(patients.filter(patient => patient.id !== id));
                // Show success message
                Swal.fire('Deleted!', 'The patient has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User canceled deletion
                Swal.fire('Cancelled', 'The patient is safe :)', 'info');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            // Show error message if deletion fails
            Swal.fire('Error', 'Failed to delete patient. Please try again later.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Patient Details</h2>
            <Link to="/add-patient">
                    <Button variant="success" className="mb-3">Add Patient</Button>
                </Link>
            <div>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th className="border">PatientID</th>
                        <th className="border">Name</th>
                        <th className="border">Age</th>
                        <th className="border" >Gender</th>
                        <th className="border">Condition</th>
                        <th className="border">Recruitment Date</th>
                        <th  colSpan={2} className="text-center border">
              Actions
            </th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td className="border bold">{patient.patientID}</td>
                            <td className="border">{patient.name}</td>
                            <td className="border">{patient.age}</td>
                            <td className="border">{patient.gender}</td>
                            <td className="border">{patient.condition}</td>
                            <td className="border">{patient.recruitmentDate}</td>
                            <td className="text-right">
                            <Link to={`/edit/${patient.id}`} className="btn btn-primary">Edit</Link>
                </td>
                <td  className="border-right">
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
        </div>
        </div>
    );
};

export default Dashboard;
