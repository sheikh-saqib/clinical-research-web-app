import axios from 'axios';
import { BASE_URL } from '../api/api';

const StudyService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/studies`);
            return response.data;
        } catch (error) {
            console.error('Error fetching studies:', error);
            throw error;
        }
    },
    getById: async (studyId) => {
        try {
            const response = await axios.get(`${BASE_URL}/studies/${studyId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching study:', error);
            throw error;
        }
    },
    create: async (study) => {
        try {
            await axios.post(`${BASE_URL}/studies`, study);
        } catch (error) {
            console.error('Error adding study:', error);
            throw error;
        }
    },
    update: async (studyId, study) => {
        try {
            await axios.put(`${BASE_URL}/studies/${studyId}`, study);
        } catch (error) {
            console.error('Error updating study:', error);
            throw error;
        }
    },
    delete: async (studyId) => {
        try {
            await axios.delete(`${BASE_URL}/studies/${studyId}`);
        } catch (error) {
            console.error('Error deleting study:', error);
            throw error;
        }
    },
    fetchRecruitingStudies: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/studies/recruiting`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recruiting studies:', error);
            throw error;
        }
    },
};

export default StudyService;
