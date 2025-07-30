# Exercise Tracker

A simple API microservice built with Node.js and Express for tracking user exercises. You can create users, add exercises, and retrieve exercise logs.

This project is a solution to the "Exercise Tracker" challenge from [freeCodeCamp](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker).

---

## ✨ Tech Stack

-   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
-   **Middleware:** [cors](https://github.com/expressjs/cors), [body-parser](https://github.com/expressjs/body-parser)
-   **Language:** [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

_Note: This project uses in-memory arrays for data storage, so data will be reset on server restart._

---

## 🚀 How It Works

The API has several endpoints to manage users and their exercises.

### User Management

#### `POST /api/users`

-   Creates a new user.
-   **Request Body:** `username` (string)
-   **Response:** A JSON object with the new user's `username` and `_id`.

#### `GET /api/users`

-   Retrieves a list of all users.
-   **Response:** A JSON array of all user objects.

### Exercise Logging

#### `POST /api/users/:_id/exercises`

-   Adds a new exercise to a user's log.
-   **URL Parameter:** `_id` of the user.
-   **Request Body:**
    -   `description`: (string, required)
    -   `duration`: (number, required)
    -   `date`: (string, optional, format `YYYY-MM-DD`). Defaults to the current date if omitted.
-   **Response:** The user object with the added exercise fields.

#### `GET /api/users/:_id/logs`

-   Retrieves a user's complete exercise log.
-   **URL Parameter:** `_id` of the user.
-   **Optional Query Parameters:**
    -   `from`: (date string, `YYYY-MM-DD`) - The start date for filtering logs.
    -   `to`: (date string, `YYYY-MM-DD`) - The end date for filtering logs.
    -   `limit`: (number) - The maximum number of logs to return.
-   **Response:** The user object with a `count` of the logs and a `log` array.

---

### 📤 Output Examples

-   **Create User (`POST /api/users`)**

    ```json
    {
    	"username": "fcc_test",
    	"_id": "5f6c8d9c8b8b8b8b8b8b8b8b"
    }
    ```

-   **Add Exercise (`POST /api/users/:_id/exercises`)**

    ```json
    {
    	"username": "fcc_test",
    	"description": "test",
    	"duration": 60,
    	"date": "Mon Jan 01 1990",
    	"_id": "5f6c8d9c8b8b8b8b8b8b8b8b"
    }
    ```

-   **Get User Logs (`GET /api/users/:_id/logs`)**
    ```json
    {
    	"username": "fcc_test",
    	"count": 1,
    	"_id": "5f6c8d9c8b8b8b8b8b8b8b8b",
    	"log": [
    		{
    			"description": "test",
    			"duration": 60,
    			"date": "Mon Jan 01 1990"
    		}
    	]
    }
    ```

---

## 💻 Local Development

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <REPOSITORY_NAME>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    ```
    The server will then be running on `http://localhost:3000`.

---
