import axios from 'axios';
import DashboardService from '../../services/DashboardService';

jest.mock('axios');

describe('DashboardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle errors when fetching patient study details', async () => {
        // Mocking the error response
        const errorMessage = 'Failed to fetch patient study details';
        const mockError = new Error(errorMessage);

        // Mocking the axios.get method to throw an error
        axios.get.mockRejectedValue(mockError);

        // Spy on console.error
        const consoleErrorSpy = jest.spyOn(console, 'error');

        // Call the method to fetch patient study details
        try {
            await DashboardService.getPatientStudyDetails();
        } catch (error) {
            // Assertions
            expect(error).toEqual(mockError);
            expect(error.message).toEqual(errorMessage);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching patient study details:', mockError);
        }
    });

    it('should fetch patient study details successfully', async () => {
        // Mocking the successful response
        const mockData = [
            {
                patientID: '001',
                name: 'John Smith',
                age: 45,
                gender: 'Male',
                condition: 'Hypertension',
                recruitmentDate: '2024-05-05'
            },
            // Add more mock data if needed
        ];
        axios.get.mockResolvedValue({ data: mockData });

        // Call the method to fetch patient study details
        const result = await DashboardService.getPatientStudyDetails();

        // Assertions
        expect(result).toEqual(mockData);
    });
});