import {create} from "zustand";
import axios from "axios";

export const useRoomStore = create((set) => ({
    room: null,
    userRooms: null,
    roomLoading: false,
    roomError: null,
    deleteSuccess: false,

    getRoomBySlug: async (slug, password) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/rooms/slug/${slug}`,
                {
                    password
                },
                {
                    withCredentials: true,
                    method: "POST",
                });
            set(() => ({room: res.data.room}));
        } catch (err) {
            set({room: null, roomError: err?.response?.data?.message || err?.message || "Failed to load room"});
        } finally {
            set({roomLoading: false});
        }
    },

    getUserRooms: async (token) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            set(() => ({userRooms: res.data.rooms}));
        } catch (err) {
            set({userRooms: null, roomError: err?.response?.data?.message || err?.message || "Failed to load user rooms"});
        } finally {
            set({roomLoading: false});
        }
    },

    createRoom: async (data, token) => {
        set({roomLoading: true, roomError: null, room: null});
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/rooms`, data,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            set(() => ({room: res.data.room}));
        } catch (err) {
            set({room: null, roomError: err?.response?.data?.message || err?.message || "Failed to create room"});
        } finally {
            set({roomLoading: false});
        }
    },

    deleteRoom: async (id, token) => {
        set({roomLoading: true, roomError: null, deleteSuccess: false});
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${id}`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
            });
            set(() => ({deleteSuccess: true}));
        } catch (err) {
            set({deleteSuccess: null, roomError: err?.response?.data?.message || err?.message || "Failed to delete room"});
        } finally {
            set({roomLoading: false});
        }
    }
}));