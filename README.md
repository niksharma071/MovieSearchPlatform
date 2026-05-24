# TMDB Full-Stack Movie Discovery Platform

## Overview
This project is a full-stack Movie Discovery Platform powered by The Movie Database (TMDB) API. It was built for the Akrisso Code Challenge Assessment. The application allows users to browse popular movies, search by title, view detailed movie information (including cast and trailers), and manage a personal watchlist.

## Features Implemented
* **Backend API Gateway:** A centralized Node.js/Express server that securely handles all external requests to the TMDB API.
* **Frontend Browse & Search:** A responsive React UI for exploring trending movies and searching the catalog.
* **Movie Detail Page:** In-depth views displaying full movie details, genres, cast/crew, and similar recommendations.
* **Watchlist (Persistence):** MongoDB integration allowing users to save and persist their favorite movies.
* **Auth & User Sessions:** Secure login, signup, and logout functionality using JWT and HTTP-only cookies.

## Tech Stack
* **Frontend:** React.js (Vite)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **External API:** TMDB API v3

## Project Structure
The repository is divided into separate directories for the frontend and backend to maintain a clear separation of concerns.

```text
MOVIEPLATFORM/
├── backend/       # Node.js & Express server
└── frontend/      # React client application
```

## Environment Variables
To run this project locally, you will need to set up environment variables for both the backend and frontend.

**Backend (`backend/.env`)**
Create a `.env` file in the `backend` directory with the following variables:
* `PORT=5000`
* `TMDB_BEARER=your_tmdb_read_access_token_here`
* `TMDB_BASE=https://api.themoviedb.org/3`
* `MONGO_URI=your_mongodb_connection_string`
* `JWT_SECRET=your_jwt_secret_key`

**Frontend (`frontend/.env`)**
Create a `.env` file in the `frontend` directory:
* `VITE_API_URL=http://localhost:5000` 

---

## Installation & Setup
Follow these steps to get the development environment running locally.

1. **Clone the repository:**
   ```bash
   git clone [YOUR_REPO_URL]
   cd MOVIEPLATFORM
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Application
You need to run both the Node/Express backend and the React frontend servers simultaneously.

**1. Start the Backend Server:**
Open a terminal window and run:
```bash
cd backend
npm run dev
```

**2. Start the Frontend Client:**
Open a second terminal window and run:
```bash
cd frontend
npm run dev
```
The application should now be running and accessible at `http://localhost:5173`.

---

## API Endpoints (Backend Gateway)
The Node.js backend acts as a gateway to the TMDB API, protecting the access token and formatting responses for the frontend.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Movie Routes** | | |
| `GET` | `/api/movie/popular` | Fetches trending and popular movies |
| `GET` | `/api/movie/trending` | Fetches weekly trending movies |
| `GET` | `/api/movie/search` | Searches for movies by title |
| `GET` | `/api/movie/genres` | Fetches the genre catalogue |
| `GET` | `/api/movie/discover` | Discovers movies by genre filters |
| `GET` | `/api/movie/:id` | Retrieves full movie details |
| `GET` | `/api/movie/:id/credits`| Retrieves cast & crew information |
| `GET` | `/api/movie/:id/videos` | Fetches movie trailers & clips |
| `GET` | `/api/movie/:id/recommendations` | Retrieves similar movie recommendations |
| **Auth Routes** | | |
| `POST` | `/api/auth/signup` | Registers a new user |
| `POST` | `/api/auth/login` | Authenticates a user and issues a token |
| `GET` | `/api/auth/me` | Retrieves the current authenticated user |
| `POST` | `/api/auth/logout` | Logs out the current user |
| **Watchlist Routes** (Protected) | | |
| `GET` | `/api/auth/watchlist` | Gets the authenticated user's watchlist |
| `POST` | `/api/auth/watchlist` | Adds a movie to the user's watchlist |
| `DELETE`| `/api/auth/watchlist/:movieId`| Removes a movie from the user's watchlist |
| **System** | | |
| `GET` | `/api/health` | Server health check endpoint |


## Architecture & Trade-offs Note
For the architectural design, I implemented a Backend-for-Frontend (BFF) pattern using Node.js and Express. This acts as a secure API Gateway to mask the TMDB Bearer token, ensuring client-side security while formatting the TMDB payload specifically for the React frontend's needs. 

For frontend state management, I relied on standard React state. By carefully structuring component hierarchies, I managed prop-drilling effectively without introducing the unnecessary boilerplate and overhead of external state libraries like Redux. 

For data persistence and user sessions, I utilized MongoDB and JWT stored in HTTP-only cookies for enhanced security against XSS attacks. A primary architectural trade-off was deciding how to store the wishlist data. Instead of just saving TMDB movie IDs, I chose to embed the entire movie object directly inside the user's database array. While this increases the database document size and risks slight data staleness if TMDB updates a movie's details, it drastically optimizes read performance. Rendering the user's wishlist requires zero additional external API calls to TMDB, resulting in a significantly faster and smoother user experience.


---
**Author:** Nikhil Sharma