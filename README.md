# Clinical Research Project

This project consists of two main parts: a backend server built with Spring Boot and Java 21, and a frontend application built with React.


Make sure you have the following installed on your machine:

- Java Development Kit (JDK) 21
- Node.js
- npm (comes with Node.js)
- Maven (for building the Spring Boot project)


## Assumptions Made

- **Ongoing Study**: I assumed that "ongoing study" in the requirment document refers to studies with a "Recruiting" status.

- **Linking Patients to Studies**: I've decided to use the integer part of `PatientId` column in the `Patients` table as a foreign key, which represents the `StudyId` in the `Studies` table and is diplayed as StudyId in the Patients Table on the front-end. This allows multiple patients to be linked to the same study.

- **Unique Identifier for Patients**: I've added a unique identifier for each patient called `PatientId`. This provides a unique reference for each patient record in the `Patients` table.


## Backend Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/sheikh-saqib/clinical-research-web-app.git
    ```

2. **Navigate to the backend directory:**

    ```sh
    cd API
    ```

3. **Build the backend application:**

    ```sh
    ./mvnw clean install
    ```

4. **Run the backend application:**

    ```sh
    ./mvnw spring-boot:run
    ```

    The backend server should now be running on `http://localhost:8080`.

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```sh
    cd client
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Run the frontend tests:**

    ```sh
    npm test
    ```

4. **Run the frontend application:**

    ```sh
    npm start
    ```

    The frontend application should now be running on `http://localhost:3000`.

## Postman API Collection

You can import the provided Postman API collection to interact with the backend API endpoints. The collection includes requests for managing studies and patients, such as creating, reading, updating, and deleting records. 

[Download Postman Collection](https://github.com/sheikh-saqib/clinical-research-web-app/tree/main/Postman)

The results are also in the provided link.