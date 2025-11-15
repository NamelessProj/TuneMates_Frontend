import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/spotify`;

export const useSpotifyStore = create((set) => ({
    spotifyAuthUrl: null,
    spotifyLoading: false,
    spotifyError: null,
    searchedSongs: null,

    fetchSpotifyAuthUrl: async () => {
        set({spotifyLoading: true, spotifyError: null});
        try {
            const res = await axios.get(`${baseUrl}/oathlink`, {
                withCredentials: true,
                method: "GET"
            });
            set(() => ({spotifyAuthUrl: res.data.url}));
        } catch (err) {
            set({spotifyAuthUrl: null, spotifyError: err?.response?.data?.message || err?.message || "Failed to fetch Spotify authorization URL"});
        } finally {
            set({spotifyLoading: false});
        }
    },

    searchSongs: async (q, offset) => {
        set({spotifyLoading: true, spotifyError: null});
        const market = 'US';
        try {
            const res = await axios.get(`${baseUrl}/search/${q}/${offset}/${market}`, {
                withCredentials: true,
                method: "GET"
            });
            set(() => ({searchedSongs: res.data}));
        } catch (err) {
            set({searchedSongs: null, spotifyError: err?.response?.data?.message || err?.message || "Failed to search songs on Spotify"});
        } finally {
            set({spotifyLoading: false});
        }
    }
}));