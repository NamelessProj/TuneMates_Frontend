import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/rooms`;

export const useCodeStore = create((set) => ({
    code: null,
    allCodes: null,
    expiresAt: null,

    codeError: null,
    codesError: null,

    codeLoading: false,
    codesLoading: false,
    codeDeleteLoading: false,

    /**
     * Fetches a code for a room by its ID.
     * @param roomId {number} The ID of the room
     * @param password {string} The password for the room
     * @param expiresInHours {number} The number of hours until the code expires
     * @param token {string} The authentication token
     * @returns {Promise<void>} A promise that resolves when the code is fetched
     */
    getCodeForRoom: async (roomId, password, expiresInHours, token) => {
        set({codeLoading: true, codeError: null});
        try {
            const res = await axios.post(`${baseUrl}/code/${roomId}`,
                {
                    password,
                    expiresInHours
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "POST",
                });
            set(() => ({code: res.data.code, expiresAt: res.data.expiresAt}));
        } catch (err) {
            set({code: null, expiresAt: null, codeError: err?.response?.data || err?.message || "Failed to get code"});
        } finally {
            set({codeLoading: false});
        }
    },

    /**
     * Fetches all codes for a given room.
     * @param roomId {number} The ID of the room
     * @param token {string} The authentication token
     * @returns {Promise<void>} A promise that resolves when the codes are fetched
     */
    getAllCodesForRoom: async (roomId, token) => {
        set({codesLoading: true, codesError: null});
        try {
            const res = await axios.get(`${baseUrl}/codes/${roomId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "GET",
                });
            set(() => ({allCodes: res.data.codes}));
        } catch (err) {
            set({codesError: err?.response?.data || err?.message || "Failed to get codes"});
        } finally {
            set({codesLoading: false});
        }
    },

    /**
     * Deletes a code.
     * @param code {string} The code to delete
     * @param token {string} The authentication token
     * @returns {Promise<boolean>} A promise that resolves to true if the code was deleted successfully, false otherwise
     */
    deleteCode: async (code, token) => {
        let success = false;
        set({codeDeleteLoading: true, codeError: null});
        try {
            await axios.post(`${baseUrl}/delete/code`,
                {
                    code,
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "POST",
                });
            success = true;
        } catch (err) {
            set({codeError: err?.response?.data || err?.message || "Failed to delete code"});
        } finally {
            set({codeDeleteLoading: false});
        }
        return success;
    }
}));