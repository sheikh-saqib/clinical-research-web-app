# Clinical Research Project

This project consists of two main parts: a backend server built with Spring Boot and Java 21, and a frontend application built with React.


Make sure you have the following installed on your machine:

- Java Development Kit (JDK) 21
- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Maven (for building the Spring Boot project)

## Backend Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/sheikh-saqib/clinical-research.git
    cd clinical-research
    ```

2. **Navigate to the backend directory:**

    ```sh
    cd API
    ```

3. **Build the backend application:**

    ```sh
    mvn clean install
    ```

4. **Run the backend application:**

    ```sh
    mvn spring-boot:run
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

3. **Run the frontend application:**

    ```sh
    npm start
    ```

    The frontend application should now be running on `http://localhost:3000`.