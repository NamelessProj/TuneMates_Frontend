import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/songs`;

export const useSongStore = create((set) => ({
    currentSong: null,
    pendingSongs: [],
    songLoading: false,
    songError: null,

    sendSongToRoom: async (roomId, songId=null, songUri="") => {
        set({songLoading: true, songError: null});
        try {
            await axios.post(`${baseUrl}/room/${roomId}/${songId || ""}`,
                {uri: songUri},
                {
                    withCredentials: true,
                    method: "POST",
                });
        } catch (err) {
            set({songError: err?.response?.data?.message || err?.message || "Failed to send song to room"});
        } finally {
            set({songLoading: false});
        }
    },

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
            console.log(res.data);
        } catch (err) {
            set({songError: err?.response?.data?.message || err?.message || "Failed to get songs from room"});
        } finally {
            set({songLoading: false});
        }
    }
}));