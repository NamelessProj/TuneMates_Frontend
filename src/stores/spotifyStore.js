import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/spotify`;

export const useSpotifyStore = create((set) => ({
    spotifyAuthUrl: null,
    userPlaylists: null,
    spotifyLoading: false,
    spotifyError: null,

    /**
     * Fetches the Spotify authorization URL for user authentication.
     * @returns {Promise<void>} A promise that resolves when the URL is fetched
     */
    fetchSpotifyAuthUrl: async () => {
        set({spotifyLoading: true, spotifyError: null});
        try {
            const res = await axios.get(`${baseUrl}/oathlink`, {
                withCredentials: true,
                method: "GET"
            });
            set(() => ({spotifyAuthUrl: res.data.url}));
        } catch (err) {
            set({spotifyAuthUrl: null, spotifyError: err?.response?.data || err?.message || "Failed to fetch Spotify authorization URL"});
        } finally {
            set({spotifyLoading: false});
        }
    },

    /**
     * Adds a song to the playlist of the specified room.
     * @param roomId {number} The ID of the room
     * @param songId {number} The ID of the song to add
     * @param token {string} The user's authentication token
     * @returns {Promise<boolean>} A promise that resolves to `true` if the song was added successfully, or `false` otherwise
     */
    addSongToPlaylist: async (roomId, songId, token) => {
        let result = false;
        set({spotifyLoading: true, spotifyError: null});
        try {
            await axios.post(`${baseUrl}/playlist/${roomId}/${songId}`,
                null,
                {
                    withCredentials: true,
                        headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "POST"
                });
            result = true;
        } catch (err) {
            set({spotifyError: err?.response?.data || err?.message || "Failed to add the song to the playlist"});
        } finally {
            set({spotifyLoading: false});
        }
        return result;
    },

    /**
     * Fetches the user's Spotify playlists.
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the playlists are fetched
     */
    getUserPlaylist: async (token) => {
        set({spotifyLoading: true, spotifyError: null});
        try {
            const res = await axios.get(`${baseUrl}/playlist/me`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "GET"
                });
            set(() => ({userPlaylists: res.data.items}));
        } catch (err) {
            set({spotifyError: err?.response?.data || err?.message || "Failed to load user playlists"});
        } finally {
            set({spotifyLoading: false});
        }
    }
}));