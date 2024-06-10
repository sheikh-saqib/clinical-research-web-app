import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import dashboardService from '../../services/DashboardService';
import patientService from '../../services/PatientService';

const Dashboard = () => {
    const [patientStudies, setPatientStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientStudies = async () => {
            try {
                const data = await dashboardService.getPatientStudyDetails();
                setPatientStudies(data);
            } catch (error) {
                console.error('Error fetching patient studies:', error);
                navigate('/error');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientStudies();
    }, [navigate]);

    const handleDelete = async (patientId) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Yes, delete the patient!',
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                await patientService.delete(patientId);
                setPatientStudies(patientStudies.filter(patientStudy => patientStudy.id !== patientId));
                Swal.fire('Deleted!', 'The patient has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'The patient is safe :)', 'info');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            Swal.fire('Error', 'Failed to delete patient. Please try again later.', 'error');
        }
    };

    const handleShowModal = async (patientId) => {
        try {
            const patientData = await patientService.getById(patientId);
            setSelectedPatient(patientData);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching patient details:', error);
            Swal.fire('Error', 'Failed to fetch patient details. Please try again later.', 'error');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPatient(null);
    };

    const handleRecruitNewPatient = () => {
        const hasRecruitingStudies = patientStudies.some(patientStudy => patientStudy.studyStatus === "Recruiting");
        if (!hasRecruitingStudies) {
            Swal.fire({
                icon: 'info',
                title: 'No Studies Available',
                text: 'There are currently no studies available for recruitment.',
                confirmButtonText: 'Okay'
            });
        } else {
            navigate('/add-patient');
        }
    };

    return (
        <div className="container">
            <h2>Clinical Research Recruitment Software</h2>
            <Button variant="success" className="mb-3" onClick={handleRecruitNewPatient}>
                Recruit New Patient
            </Button>
            <div className="row">
                <div className="col">
                    {loading ? (
                        <div className="text-center">
                            <ClipLoader size={50} loading={loading} />
                        </div>
                    ) : (
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="border text-center align-middle">Patient Name</th>
                                    <th className="border text-center align-middle">Study Title</th>
                                    <th className="border text-center align-middle">Study Description</th>
                                    <th className="border text-center align-middle">Recruitment Date</th>
                                    <th colSpan={2} className="text-center border align-middle">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientStudies.map(patientStudy => (
                                    <tr key={patientStudy.id}>
                                        <td
                                            className="border bold"
                                            style={{ cursor: 'pointer', color: 'blue' }}
                                            onClick={() => handleShowModal(patientStudy.id)}
                                        >
                                            {patientStudy.patientName}
                                        </td>
                                        <td className="border">{patientStudy.studyTitle}</td>
                                        <td className="border">{patientStudy.studyDescription}</td>
                                        <td className="border">{patientStudy.recruitmentDate}</td>
                                        <td className="text-right">
                                            <Link to={`/edit/${patientStudy.id}`} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td className="border-right">
                                            <button
                                                onClick={() => handleDelete(patientStudy.id)}
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
            {selectedPatient && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Patient Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Patient Name:</strong> {selectedPatient.name}</p>
                        <p><strong>Age:</strong> {selectedPatient.age}</p>
                        <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                        <p><strong>Condition:</strong> {selectedPatient.condition}</p>
                        <p><strong>Recruitment Date:</strong> {selectedPatient.recruitmentDate}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
    
};

export default Dashboard;

