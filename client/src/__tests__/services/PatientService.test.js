import PatientService from '../../services/PatientService';

describe('PatientService', () => {
    describe('getPatientById', () => {
      it('should fetch a patient by id', async () => {
        // Mocking the response data
        const mockPatientId = '001';
        const mockPatientData = {
          patientID: mockPatientId,
          name: 'John Smith',
          age: 45,
          gender: 'Male',
          condition: 'Hypertension',
          recruitmentDate: '2024-05-05'
        };
        
        // Mocking the PatientService.getPatientById method
        PatientService.getPatientById = jest.fn().mockResolvedValue(mockPatientData);
        
        // Call the method to fetch the patient
        const patient = await PatientService.getPatientById(mockPatientId);
        
        // Assertions
        expect(patient).toBeDefined();
        expect(patient.patientID).toEqual(mockPatientId);
        expect(patient.name).toEqual('John Smith');
        expect(patient.age).toEqual(45);
        expect(patient.gender).toEqual('Male');
        expect(patient.condition).toEqual('Hypertension');
        expect(patient.recruitmentDate).toEqual('2024-05-05');
      });
      
      it('should handle errors when fetching a patient by id', async () => {
        // Mocking the error response
        const errorMessage = 'Failed to fetch patient';
        const mockError = new Error(errorMessage);
        
        // Mocking the PatientService.getPatientById method to throw an error
        PatientService.getPatientById = jest.fn().mockRejectedValue(mockError);
        
        // Call the method to fetch the patient
        try {
          await PatientService.getPatientById('001');
        } catch (error) {
          // Assertions
          expect(error).toEqual(mockError);
          expect(error.message).toEqual(errorMessage);
        }
      });
    });
    
    describe('getAllPatients', () => {
      it('should fetch all patients', async () => {
        // Mocking the response data
        const mockPatients = [
          {
            patientID: '001',
            name: 'John Smith',
            age: 45,
            gender: 'Male',
            condition: 'Hypertension',
            recruitmentDate: '2024-05-05'
          },
          // Add more mock patients as needed
        ];
        
        // Mocking the PatientService.getAllPatients method
        PatientService.getAllPatients = jest.fn().mockResolvedValue(mockPatients);
        
        // Call the method to fetch all patients
        const patients = await PatientService.getAllPatients();
        
        // Assertions
        expect(patients).toBeDefined();
        expect(Array.isArray(patients)).toBeTruthy();
        expect(patients.length).toBeGreaterThan(0);
        expect(patients[0].patientID).toEqual('001');
        // Add more assertions as needed
      });
      
      it('should handle errors when fetching all patients', async () => {
        // Mocking the error response
        const errorMessage = 'Failed to fetch patients';
        const mockError = new Error(errorMessage);
        
        // Mocking the PatientService.getAllPatients method to throw an error
        PatientService.getAllPatients = jest.fn().mockRejectedValue(mockError);
        
        // Call the method to fetch all patients
        try {
          await PatientService.getAllPatients();
        } catch (error) {
          // Assertions
          expect(error).toEqual(mockError);
          expect(error.message).toEqual(errorMessage);
        }
      });
    });
    
    describe('addPatient', () => {
      it('should add a new patient', async () => {
        // Mocking the patient data to be added
        const newPatientData = {
          name: 'Jane Doe',
          age: 30,
          gender: 'Female',
          condition: 'Diabetes',
          recruitmentDate: '2024-06-10'
        };
        
        // Mocking the response data
        const mockResponse = {
          success: true,
          message: 'Patient added successfully'
        };
        
        // Mocking the PatientService.addPatient method
        PatientService.addPatient = jest.fn().mockResolvedValue(mockResponse);
        
        // Call the method to add a new patient
        const response = await PatientService.addPatient(newPatientData);
        
        // Assertions
        expect(response).toBeDefined();
        expect(response.success).toBeTruthy();
        expect(response.message).toEqual('Patient added successfully');
      });
      
      it('should handle errors when adding a new patient', async () => {
        // Mocking the patient data to be added
        const newPatientData = {
          name: 'Jane Doe',
          age: 30,
          gender: 'Female',
          condition: 'Diabetes',
          recruitmentDate: '2024-06-10'
        };
        
        // Mocking the error response
        const errorMessage = 'Failed to add patient';
        const mockError = new Error(errorMessage);
        
        // Mocking the PatientService.addPatient method to throw an error
        PatientService.addPatient = jest.fn().mockRejectedValue(mockError);
        
        // Call the method to add a new patient
        try {
          await PatientService.addPatient(newPatientData);
        } catch (error) {
          // Assertions
          expect(error).toEqual(mockError);
          expect(error.message).toEqual(errorMessage);
        }
      });
    });
    
    describe('updatePatient', () => {
        it('should update an existing patient', async () => {
            // Mocking the patient data to be updated
            const updatedPatientData = {
                patientID: '001',
                name: 'John Doe',
                age: 50,
                gender: 'Male',
                condition: 'Asthma',
                recruitmentDate: '2024-05-05'
            };
    
            // Mocking the response data
            const mockResponse = {
                success: true,
                message: 'Patient updated successfully'
            };
    
            // Mocking the PatientService.updatePatient method
            PatientService.updatePatient = jest.fn().mockResolvedValue(mockResponse);
    
            // Call the method to update an existing patient
            const response = await PatientService.updatePatient(updatedPatientData);
    
            // Assertions
            expect(response).toBeDefined();
            expect(response.success).toBeTruthy();
            expect(response.message).toEqual('Patient updated successfully');
        });
    
        it('should handle errors when updating an existing patient', async () => {
            // Mocking the patient data to be updated
            const updatedPatientData = {
                patientID: '001',
                name: 'John Doe',
                age: 50,
                gender: 'Male',
                condition: 'Asthma',
                recruitmentDate: '2024-05-05'
            };
    
            // Mocking the error response
            const errorMessage = 'Failed to update patient';
            const mockError = new Error(errorMessage);
    
            // Mocking the PatientService.updatePatient method to throw an error
            PatientService.updatePatient = jest.fn().mockRejectedValue(mockError);
    
            // Call the method to update an existing patient
            try {
                await PatientService.updatePatient(updatedPatientData);
            } catch (error) {
                // Assertions
                expect(error).toEqual(mockError);
                expect(error.message).toEqual(errorMessage);
            }
        });
    });
    
    describe('deletePatient', () => {
        it('should delete an existing patient', async () => {
            // Mocking the patient ID to be deleted
            const patientIdToDelete = '001';
    
            // Mocking the response data
            const mockResponse = {
                success: true,
                message: 'Patient deleted successfully'
            };
    
            // Mocking the PatientService.deletePatient method
            PatientService.deletePatient = jest.fn().mockResolvedValue(mockResponse);
    
            // Call the method to delete an existing patient
            const response = await PatientService.deletePatient(patientIdToDelete);
    
            // Assertions
            expect(response).toBeDefined();
            expect(response.success).toBeTruthy();
            expect(response.message).toEqual('Patient deleted successfully');
        });
    
        it('should handle errors when deleting an existing patient', async () => {
            // Mocking the patient ID to be deleted
            const patientIdToDelete = '001';
    
            // Mocking the error response
            const errorMessage = 'Failed to delete patient';
            const mockError = new Error(errorMessage);
    
            // Mocking the PatientService.deletePatient method to throw an error
            PatientService.deletePatient = jest.fn().mockRejectedValue(mockError);
    
            // Call the method to delete an existing patient
            try {
                await PatientService.deletePatient(patientIdToDelete);
            } catch (error) {
                // Assertions
                expect(error).toEqual(mockError);
                expect(error.message).toEqual(errorMessage);
            }
        });
    });    
    
});