import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/songs`;

export const useSongStore = create((set) => ({
    currentSong: null,
    songLoading: false,
    songError: null,

    sendSongToRoom: async (songId, roomId) => {
        set({songLoading: true, songError: null});
        try {
            await axios.post(`${baseUrl}/${roomId}/${songId}`,
                null,
                {
                    withCredentials: true,
                    method: "POST",
                });
        } catch (err) {
            set({songError: err?.response?.data?.message || err?.message || "Failed to send song to room"});
        } finally {
            set({songLoading: false});
        }
    }
}));