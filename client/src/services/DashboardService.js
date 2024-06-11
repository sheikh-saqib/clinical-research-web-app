import axios from 'axios';
import { BASE_URL } from '../api/api';

const DashboardService = {
    getPatientStudyDetails: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard`);
            //sort the patients by recruitment date
            const sortedData = response.data.sort((a, b) => new Date(b.recruitmentDate) - new Date(a.recruitmentDate));
            return sortedData;
        } catch (error) {
            console.error('Error fetching patient study details:', error);
            throw error;
        }
    }
};

export default DashboardService;
