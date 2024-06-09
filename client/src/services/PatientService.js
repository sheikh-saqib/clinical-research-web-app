import axios from 'axios';
import { BASE_URL } from '../api/api';

const PatientService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/patients`);
            return response.data;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/patients/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching patient:', error);
            throw error;
        }
    },
    create: async (patient) => {
        try {
            console.log(patient);
            await axios.post(`${BASE_URL}/patients`, patient);
        } catch (error) {
            console.error('Error adding patient:', error);
            throw error;
        }
    },
    update: async (id, patient) => {
        try {
            console.log(id)
            console.log(patient)
            await axios.put(`${BASE_URL}/patients/${id}`, patient);
        } catch (error) {
            console.error('Error updating patient:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/patients/${id}`);
        } catch (error) {
            console.error('Error deleting patient:', error);
            throw error;
        }
    },
};

export default PatientService;
