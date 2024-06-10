import axios from 'axios';
import StudyService from '../../services/StudyService';
import { BASE_URL } from '../../api/api';

// Mock the axios library
jest.mock('axios');

describe('StudyService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getById - success', async () => {
        const mockData = { id: 1, title: 'Study 1' };
        const studyId = 1;
        axios.get.mockResolvedValue({ data: mockData });

        const result = await StudyService.getById(studyId);
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/studies/${studyId}`);
    });

    test('getById - error', async () => {
        const errorMessage = 'Failed to fetch study';
        const studyId = 1;
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(StudyService.getById(studyId)).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/studies/${studyId}`);
    });

    test('create - success', async () => {
        const study = { title: 'New Study', description: 'Description' };
        axios.post.mockResolvedValue();

        await StudyService.create(study);
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/studies`, study);
    });

    test('create - error', async () => {
        const errorMessage = 'Failed to create study';
        const study = { title: 'New Study', description: 'Description' };
        axios.post.mockRejectedValue(new Error(errorMessage));

        await expect(StudyService.create(study)).rejects.toThrow(errorMessage);
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/studies`, study);
    });

     // Test for update function
     test('update - success', async () => {
        const studyId = 1;
        const updatedStudy = { id: 1, title: 'Updated Study', description: 'Updated Description' };
        axios.put.mockResolvedValue();

        await StudyService.update(studyId, updatedStudy);
        expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/studies/${studyId}`, updatedStudy);
    });

    test('update - error', async () => {
        const errorMessage = 'Failed to update study';
        const studyId = 1;
        const updatedStudy = { id: 1, title: 'Updated Study', description: 'Updated Description' };
        axios.put.mockRejectedValue(new Error(errorMessage));

        await expect(StudyService.update(studyId, updatedStudy)).rejects.toThrow(errorMessage);
        expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/studies/${studyId}`, updatedStudy);
    });

    // Test for delete function
    test('delete - success', async () => {
        const studyId = 1;
        axios.delete.mockResolvedValue();

        await StudyService.delete(studyId);
        expect(axios.delete).toHaveBeenCalledWith(`${BASE_URL}/studies/${studyId}`);
    });

    test('delete - error', async () => {
        const errorMessage = 'Failed to delete study';
        const studyId = 1;
        axios.delete.mockRejectedValue(new Error(errorMessage));

        await expect(StudyService.delete(studyId)).rejects.toThrow(errorMessage);
        expect(axios.delete).toHaveBeenCalledWith(`${BASE_URL}/studies/${studyId}`);
    });

    // Test for fetchRecruitingStudies function
    test('fetchRecruitingStudies - success', async () => {
        const mockData = [{ id: 1, title: 'Recruiting Study' }];
        axios.get.mockResolvedValue({ data: mockData });

        const result = await StudyService.fetchRecruitingStudies();
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/studies/recruiting`);
    });

    test('fetchRecruitingStudies - error', async () => {
        const errorMessage = 'Failed to fetch recruiting studies';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(StudyService.fetchRecruitingStudies()).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/studies/recruiting`);
    });
});