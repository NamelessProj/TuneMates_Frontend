import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUserStore = create((set) => ({
    user: null,
    token: null,
    userLoading: false,
    userError: null,

    /**
     * Registers a new user with the provided data.
     * @param data {object} The registration data
     * @returns {Promise<void>} A promise that resolves when the user is registered
     */
    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${baseUrl}/register`,
                data,
                {
                    withCredentials: true,
                    method: "POST",
                });
            set(() => ({user: res.data.user, token: res.data.token}));
        }catch(err){
            set({user: null, userError: err?.response?.data || err?.message || "Failed to register"});
        }finally{
            set({userLoading: false});
        }
    },

    /**
     * Logs in a user with the provided data.
     * @param data {object} The login data
     * @returns {Promise<void>} A promise that resolves when the user is logged in
     */
    login: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${baseUrl}/login`,
                data,
                {
                    withCredentials: true,
                    method: "POST",
                });
            set(() => ({user: res.data.user, token: res.data.token}));
        }catch(err){
            set({user: null, userError: err?.response?.data || err?.message || "Failed to login"});
        }finally{
            set({userLoading: false});
        }
    },

    /**
     * Edits the authenticated user's information.
     * @param data {object} The new user data
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the user is edited
     */
    editUser: async (data, token) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${baseUrl}/me`,
                data,
                {
                    withCredentials: true,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            set(() => ({user: res.data.user}));
        }catch(err){
            set({userError: err?.response?.data || err?.message || "Failed to edit user"});
        }finally{
            set({userLoading: false});
        }
    },

    /**
     * Edits the authenticated user's password.
     * @param data {object} The password data (current and new password)
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the password is edited
     */
    editUserPassword: async (data, token) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${baseUrl}/me/password`,
                data,
                {
                    withCredentials: true,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            set(() => ({user: res.data.user}));
        }catch(err){
            set({userError: err?.response?.data || err?.message || "Failed to edit user's password"});
        }finally{
            set({userLoading: false});
        }
    },

    /**
     * Connects the authenticated user's account to Spotify.
     * @param code {string} The Spotify authorization code
     * @param state {string} The Spotify state parameter to prevent CSRF attacks
     * @param token {string} The user's authentication token
     * @returns {Promise<void>} A promise that resolves when the user is connected to Spotify
     */
    connectUserToSpotify: async (code, state, token) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${baseUrl}/connect/spotify/${code}/${state}`,
                null,
                {
                    withCredentials: true,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            set(() => ({user: res.data.user}));
        }catch(err){
            set({userError: err?.response?.data || err?.message || "Failed to connect user to Spotify"});
        }finally{
            set({userLoading: false});
        }
    },

    /**
     * Deletes the authenticated user's account.
     * @param password {string} The user's current password for verification
     * @param token {string} The user's authentication token
     * @returns {Promise<boolean>} A promise that resolves to `true` if the user was deleted successfully, `false` otherwise
     */
    deleteUser: async (password, token) => {
        let result = false;
        set({userLoading: true, userError: null});
        try{
            await axios.post(`${baseUrl}/delete/me`,
                {
                    password: password,
                },
                {
                    withCredentials: true,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            set(() => ({user: null}));
            result = true;
        }catch(err){
            set({userError: err?.response?.data || err?.message || "Failed to delete user"});
        }finally{
            set({userLoading: false});
        }
        return result;
    }
}));