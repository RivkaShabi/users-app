# Users App – Full Stack Project

This project is a full-stack web application for managing users, built with **Node.js (backend)** and **React (frontend)**.

---

## My Versions

- **Node.js:** 18.19.0
- **NPM:** 9.2.0

---

## Backend Setup (`users-app-beckend`)

### 1. Go to the backend folder:

```
cd users-app-beckend
```

### 2. Install dependencies:

```
npm install
```

### 3. Run the server:

```bash
node server.js
```

---

## Frontend Setup (`users-app-frontend`)

### 1. Go to the frontend folder:

```
cd users-app-frontend
```

### 2. Install dependencies:

```
npm install
```

### 3. Start the React app:

```
npm start
```

---

## 📚 Backend Dependencies

| Library          | Purpose                                                              |
| ---------------- | -------------------------------------------------------------------- |
| **axios**        | To make HTTP requests (to external or internal APIs).                |
| **bcryptjs**     | For hashing passwords securely.                                      |
| **cors**         | To enable cross-origin requests from allowed frontends.              |
| **dotenv**       | To load environment variables from `.env` file.                      |
| **express**      | Main web framework for building the backend server.                  |
| **jsonwebtoken** | For creating and verifying JWT tokens (authentication).              |
| **mongoose**     | To interact with MongoDB databases.                                  |
| **node-cache**   | In-memory caching to store data temporarily and improve performance. |

---

## Frontend Dependencies

| Library                        | Purpose                                                 |
| ------------------------------ | ------------------------------------------------------- |
| **@emotion/react**, **styled** | For writing styled components using Emotion CSS-in-JS.  |
| **@hookform/resolvers**        | To integrate form validation with libraries like `yup`. |
| **@mui/icons-material**        | Material Design icons for UI components.                |
| **@mui/material**              | React components that follow Material Design.           |
| **@reduxjs/toolkit**           | Modern state management using Redux.                    |
| **axios**                      | For making HTTP requests to the backend.                |
| **react** / **react-dom**      | The core libraries to build UI in React.                |
| **react-hook-form**            | For easy and performant form handling in React.         |
| **react-redux**                | Binding between React and Redux.                        |
| **react-router-dom**           | To handle routing and navigation in the app.            |
| **react-toastify**             | To show popup notifications (toasts) in the UI.         |
| **yup**                        | Schema-based form validation.                           |
| **web-vitals**                 | For measuring app performance metrics.                  |

🧪 Also includes testing libraries like:

- **@testing-library/react**
- **@testing-library/jest-dom**
- **@testing-library/user-event**

---

## ✅ Features

- Authentication using JWT
- User creation, update, delete
- Data stored in MongoDB and in-memory cache
- Responsive UI with Material-UI
- Error notifications using `react-toastify`
