import {create} from "zustand";
import axios from "axios";

export const useSpotifyStore = create((set) => ({
    spotifyAuthUrl: null,
    spotifyLoading: false,
    spotifyError: null,
    spotifyAccessToken: null,
    spotifyRefreshToken: null,
    spotifyTokenExpiresIn: null,

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
    },

    fetchAccessToken: async (code) => {
        set({spotifyLoading: true, spotifyError: null});
        try {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
            const authHeader = btoa(`${clientId}:${clientSecret}`);

            const res = await axios.post('https://accounts.spotify.com/api/token', {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authHeader}`,
                }
            });
            set(() => ({
                spotifyAccessToken: res.data.access_token,
                spotifyRefreshToken: res.data.refresh_token,
                spotifyTokenExpiresIn: res.data.expires_in
            }));
        } catch (err) {
            set({spotifyError: err?.response?.data?.message || err?.message || "Failed to fetch Spotify access token"});
        } finally {
            set({spotifyLoading: false});
        }
    }
}));