# Toolbox - Full Stack Challenge

## Objective

The goal of this challenge was to develop a system consisting of an API and a frontend that interacts with an external API to retrieve, process, and display data. The solution includes creating a robust API to fetch and format data and a frontend to present the processed data in a user-friendly manner. The implementation follows the technical requirements outlined in the challenge description.

---

## Features Implemented

### API

1. **File Retrieval:**

   - Integrated with an external API to fetch a list of files using the `/v1/secret/files` endpoint.

2. **File Download:**

   - Implemented functionality to download individual files using `/v1/secret/file/{file}`.

3. **CSV Data Processing:**

   - Processed and formatted CSV files, handling errors such as empty files, malformed lines, or download failures. Malformed lines were discarded.

4. **Data Endpoint:**

   - Developed the `/files/data` endpoint to aggregate and expose the formatted data in JSON format.

5. **Testing:**

   - Created unit tests for the API using Mocha and Chai to validate its functionality.

#### Optional Features

- **GET **``** Endpoint:**

  - Added an endpoint to return the list of files available from the external API.

- **Query Parameter Filtering:**

  - Implemented filtering by file name in `/files/data?fileName=<file>`.

- **StandardJS Compliance:**

  - Ensured the code adheres to the JavaScript Standard Style (StandardJS).

- **Docker Support:**

  - Containerized the API using Docker for simplified deployment.

### Frontend

1. **Responsive User Interface:**

   - Developed a UI using React and React Bootstrap to display the data fetched from `/files/data`, following the provided wireframe ([Wireframe Link](https://cs1.ssltrust.me/s/ECH9VusiMmi3ac1)).

2. **Functional Programming:**

   - Utilized React functional components and Hook Effects for efficient and modern development.

3. **Filtering Capability:**

   - Added a frontend feature to filter data by file name, leveraging the optional API endpoint.

4. **Styling and Components:**

   - Styled the application using React Bootstrap components ([React Bootstrap Documentation](https://react-bootstrap.github.io/)).

#### Optional Features

- **Redux Integration:**

  - Used Redux for state management to handle application data consistently ([Redux Documentation](https://redux.js.org/)).

- **Unit Testing:**

  - Added unit tests for the frontend using Jest.

- **Docker Support:**

  - Containerized the frontend application for ease of deployment.

---

## Usage Instructions

### API

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the API Directory:**

   ```bash
   cd api/
   ```

3. **Start the API:**

   - For production:
     ```bash
     npm run start
     ```
   - For development:
     ```bash
     npm run dev
     ```

4. **Run Tests:**

   ```bash
   npm run test
   ```

5. **Lint the Code:**

   ```bash
   npm run lint
   ```

6. **Run Using Docker:**

   ```bash
   docker compose up -d
   ```

### Frontend

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend/
   ```

2. **Start the Application:**

   - For production:
     ```bash
     npm run build
     ```
   - For development:
     ```bash
     npm run start
     ```

3. **Run Using Docker:**

   ```bash
   docker compose up -d
   ```

---

## Troubleshooting

### Network Errors

If you encounter a `Network Error` while running the frontend:

- The frontend defaults to using the Docker port for the API.
- To use `localhost:3000`, remove the `DOCKER_API_URL` entry from `/src/enums/apiEndpoints.js` and restart the frontend application.

---

This document outlines the development and deployment of the API and frontend for the Full Stack Challenge, ensuring compliance with all technical requirements and optional enhancements.

