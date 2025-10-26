import {create} from "zustand";
import axios from "axios";

export const useRoomStore = create((set) => ({
    room: null,
    roomLoading: false,
    roomError: null,

    getRoomBySlug: async (slug, password) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/slug/${slug}`,
                {
                    params: {password},
                    method: "GET"
                });
            set(() => ({room: res.data.room}));
        } catch (err) {
            set({roomError: err?.response?.data?.message || err?.message || "Failed to load room"});
        } finally {
            set({roomLoading: false});
        }
    }
}));