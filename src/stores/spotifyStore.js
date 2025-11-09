import {create} from "zustand";
import axios from "axios";

export const useSpotifyStore = create((set) => ({
    spotifyAuthUrl: null,
    spotifyLoading: false,
    spotifyError: null,

    fetchSpotifyAuthUrl: async () => {
        set({spotifyLoading: true, spotifyError: null});
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/spotify/oathlink`, {
                withCredentials: true,
                method: "GET"
            });
            set(() => ({spotifyAuthUrl: res.data.url}));
        } catch (err) {
            set({spotifyAuthUrl: null, spotifyError: err?.response?.data?.message || err?.message || "Failed to fetch Spotify authorization URL"});
        } finally {
            set({spotifyLoading: false});
        }
    }
}));