![React.js version](https://img.shields.io/badge/React.js-^18.3.1-61DAFB?style=for-the-badge)
![Vite.js version](https://img.shields.io/badge/Vite.js-^6.0.5-646CFF?style=for-the-badge)
![Project licence](https://img.shields.io/github/license/NamelessProj/TuneMates_Frontend?style=for-the-badge)
![Repo size](https://img.shields.io/github/repo-size/NamelessProj/TuneMates_Frontend?style=for-the-badge)

# TuneMates - Frontend
This is the frontend repo for TuneMates, a platform that make collaborative music playlists easy to maintain while keeping other from adding unwanted songs.

You can find the backend repo [here](https://github.com/NamelessProj/TuneMates_Backend).

## Routes
You can find all the routes available in the application in the table below or [here](./src/App.jsx).

| Route                  | Description                                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------------------------|
| `/`                    | Landing page with app overview and features.                                                                 |
| `/login`               | User login page.                                                                                             |
| `/register`            | User registration page.                                                                                      |
| `/profile`             | User profile management page.                                                                                |
| `/room/create`         | Creating a new room.                                                                                         |
| `/room/slug/:slug`     | Page of the room, way for everyone to request songs for a room.                                              |
| `/room/slug/:slug/url` | Page of the room, way for everyone to request songs for a room by sending the URL or URI of a Spotify track. |
| `/room/edit/:roomId`   | Editing an existing room (need to be connected ofc).                                                         |
| `/room/songs/:roomId`  | Getting all the pending songs in a room.                                                                     |
| `/rooms`               | List of the user's rooms.                                                                                    |
| `/spotify/connect`     | Redirect the user to connect their Spotify account with TuneMates.                                           |
| `/spotify/callback`    | Where Spotify redirect you after the connection.                                                             |
| `/*`                   | Get redirected to the error page if you don't get to any of the existing routes.                             |

## Installation
1. Clone the repository:
2. Navigate to the project directory:
   ```bash
   cd TuneMates_Frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the necessary environment variables (see below).
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:
```env
VITE_API_URL=https://localhost:7016/api
```
Since all the routes of the frontend are prefixed with `/api`, make sure to add this prefix to the `VITE_API_URL` variable.

## Technologies Used
- React.js
- Vite.js
- Axios
- React Router
- Tailwind CSS

## Hosting
Since Spotify requires a secure connection (HTTPS) for OAuth authentication, the frontend is hosted on Vercel to ensure that all communications are secure.
You can visit the live application [here](https://tunemates.vercel.app/).

So make sure to configure your backend to accept requests from this domain.

And if you want to deploy your own version of the frontend, make sure to configure your Spotify app to include your deployment domain in the Redirect URIs.