import {create} from "zustand";
import axios from "axios";
import Cookies from "../utils/cookies.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/rooms`;
const roomKey = 'TuneMatesCurrentRoom';

export const useRoomStore = create((set) => ({
    room: null,
    currentRoom: (() => {
        try {
            const c = Cookies.get(roomKey);
            return c ? JSON.parse(c) : null;
        } catch {
            return null;
        }
    })(),
    userRooms: null,
    roomLoading: false,
    roomError: null,
    deleteSuccess: false,

    /**
     * Deletes the current room from cookies.
     * @returns {void}
     */
    deleteCurrentRoomFromCookies: () => {
        Cookies.delete(roomKey);
        set(() => ({currentRoom: null}));
    },

    /**
     * Fetches a room by its slug. You must provide the correct password to access the room.
     * @param slug {string} The slug of the room to fetch
     * @param password {string} The password for the room
     * @returns {Promise<void>} A promise that resolves when the room is fetched
     */
    getRoomBySlug: async (slug, password) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.post(`${baseUrl}/slug/${slug}`,
                {
                    password
                },
                {
                    withCredentials: true,
                    method: "POST",
                });
            set(() => ({currentRoom: res.data.room}));
            Cookies.set(roomKey, JSON.stringify(res.data.room));
        } catch (err) {
            set({room: null, roomError: err?.response?.data || err?.message || "Failed to load room"});
        } finally {
            set({roomLoading: false});
        }
    },

    /**
     * Fetches a room by its ID.
     * @param id {number} The ID of the room to fetch
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the room is fetched
     */
    getRoomById: async (id, token) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.get(`${baseUrl}/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "GET",
                });
            set(() => ({room: res.data.room}));
        } catch (err) {
            set({room: null, roomError: err?.response?.data || err?.message || "Failed to load room"});
        } finally {
            set({roomLoading: false});
        }
    },

    /**
     * Fetches a room by its unique code.
     * @param code {string} The unique code of the room to fetch
     * @returns {Promise<void>} A promise that resolves when the room is fetched
     */
    getRoomByCode: async (code) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.post(`${baseUrl}/code`,
                {
                    code
                },
                {
                    method: "POST",
                });
            set(() => ({room: res.data.room}));
            Cookies.set(roomKey, JSON.stringify(res.data.room));
        } catch (err) {
            set({room: null, roomError: err?.response?.data || err?.message || "Failed to load room"});
        } finally {
            set({roomLoading: false});
        }
    },

    /**
     * Fetches all rooms associated with the authenticated user.
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the rooms are fetched
     */
    getUserRooms: async (token) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.get(`${baseUrl}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            set(() => ({userRooms: res.data}));
        } catch (err) {
            set({userRooms: null, roomError: err?.response?.data || err?.message || "Failed to load user rooms"});
        } finally {
            set({roomLoading: false});
        }
    },

    /**
     * Creates a new room with the provided data.
     * @param data {object} The data for the new room
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the room is created
     */
    createRoom: async (data, token) => {
        set({roomLoading: true, roomError: null, room: null});
        try {
            const res = await axios.post(`${baseUrl}`, data,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            set(() => ({room: res.data.room}));
        } catch (err) {
            set({room: null, roomError: err?.response?.data || err?.message || "Failed to create room"});
        } finally {
            set({roomLoading: false});
        }
    },

    /**
     * Edits an existing room with the provided data.
     * @param data {object} The updated data for the room
     * @param roomId {number} The ID of the room to edit
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the room is edited
     */
    editRoom: async (data, roomId, token) => {
        set({roomLoading: true, roomError: null});
        try {
            const res = await axios.put(`${baseUrl}/${roomId}`, data,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "PUT",
            });
            set(() => ({room: res.data.room}));
        } catch (err) {
            set({roomError: err?.response?.data || err?.message || "Failed to edit the room"});
        } finally {
            set({roomLoading: false});
        }
    },

    /**
     * Deletes a room by its ID.
     * @param id {number} The ID of the room to delete
     * @param token {string} The user's authentication token
     * @returns {Promise<boolean>} A promise that resolves to `true` if the room was deleted successfully, `false` otherwise
     */
    deleteRoom: async (id, token) => {
        let result = false;
        set({roomLoading: true, roomError: null, deleteSuccess: false});
        try {
            await axios.delete(`${baseUrl}/${id}`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
            });
            set(() => ({deleteSuccess: true}));
            result = true;
        } catch (err) {
            set({deleteSuccess: null, roomError: err?.response?.data || err?.message || "Failed to delete room"});
        } finally {
            set({roomLoading: false});
        }
        return result;
    }
}));