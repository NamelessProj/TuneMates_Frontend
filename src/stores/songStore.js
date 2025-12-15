import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/songs`;

export const useSongStore = create((set) => ({
    currentSong: null,
    pendingSongs: [],
    songLoading: false,
    songError: null,

    /**
     * Sends a song to the specified room by ID. You can provide either a song ID or a song URI.
     * @param roomId {number} The ID of the room to send the song to
     * @param songId {string|null} If provided, the Spotify song ID to send
     * @param {string} songUri If provided, the Spotify song URI to send
     * @returns {Promise<boolean>} A promise that resolves to `true` if the song was sent successfully, or `false` otherwise
     */
    sendSongToRoom: async (roomId, songId=null, songUri="") => {
        let result = false;
        set({songLoading: true, songError: null});
        try {
            await axios.post(`${baseUrl}/room/${roomId}/${songId || ""}`,
                {uri: songUri},
                {
                    withCredentials: true,
                    method: "POST",
                });
            result = true;
        } catch (err) {
            set({songError: err?.response?.data || err?.message || "Failed to send song to room"});
        } finally {
            set({songLoading: false});
        }
        return result;
    },

    /**
     * Fetches all songs from a room with the specified status.
     * @param roomId {number} The ID of the room to fetch songs from
     * @param token {string} The user's authentication token
     * @param status {number} The status of the songs to fetch (default is `0` for pending songs)
     * @returns {Promise<void>} A promise that resolves when the songs are fetched
     */
    getAllSongsWithStatus: async (roomId, token, status=0) => {
        set({songLoading: true, songError: null});
        try {
            const res = await axios.get(`${baseUrl}/room/${roomId}/status/${status}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                });
            set(() => ({pendingSongs: res.data}));
        } catch (err) {
            set({songError: err?.response?.data || err?.message || "Failed to get songs from room"});
        } finally {
            set({songLoading: false});
        }
    }
}));