![React.js version](https://img.shields.io/badge/React.js-^18.3.1-61DAFB?style=for-the-badge)
![Vite.js version](https://img.shields.io/badge/Vite.js-^6.0.5-646CFF?style=for-the-badge)
![Project licence](https://img.shields.io/github/license/NamelessProj/TuneMates_Frontend?style=for-the-badge)
![Repo size](https://img.shields.io/github/repo-size/NamelessProj/TuneMates_Frontend?style=for-the-badge)

# TuneMates - Frontend
This is the frontend repo for TuneMates, a platform that make collaborative music playlists easy to maintain while keeping other from adding unwanted songs.

You can find the backend repo [here](https://github.com/NamelessProj/TuneMates_Backend).

## Routes
| Route                | Description                                                                      |
|----------------------|----------------------------------------------------------------------------------|
| `/`                  | Landing page with app overview and features.                                     |
| `/login`             | User login page.                                                                 |
| `/register`          | User registration page.                                                          |
| `/profile`           | User profile management page.                                                    |
| `/rooms`             | List of the user's rooms.                                                        |
| `/rooms/create`      | Creating a new room.                                                             |
| `/spotify/connect`   | Redirect the user to connect their Spotify account with TuneMates.               |
| `/spotify/callback`  | Where Spotify redirect you after the connection.                                 |
| `/room/:slug`        | Page of the room, way for everyone to request songs for a room.                  |
| `/room/edit/:roomId` | Editing an existing room (need to be connected ofc).                             |
| `/*`                 | Get redirected to the error page if you don't get to any of the existing routes. |