import {create} from "zustand";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUserStore = create((set) => ({
    user: null,
    token: null,
    userLoading: false,
    userError: null,

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
            set({user: null, userError: err?.response?.data?.message || err?.message || "Failed to register"});
        }finally{
            set({userLoading: false});
        }
    },

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
            set({user: null, userError: err?.response?.data?.message || err?.message || "Failed to login"});
        }finally{
            set({userLoading: false});
        }
    },

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
            set({userError: err?.response?.data?.message || err?.message || "Failed to edit user"});
        }finally{
            set({userLoading: false});
        }
    },

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
            set({userError: err?.response?.data?.message || err?.message || "Failed to edit user's password"});
        }finally{
            set({userLoading: false});
        }
    },

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
            set({userError: err?.response?.data?.message || err?.message || "Failed to connect user to Spotify"});
        }finally{
            set({userLoading: false});
        }
    },

    deleteUser: async (password, token) => {
        set({userLoading: true, userError: null});
        try{
            await axios.post(`${baseUrl}/delete/me`,
                {
                    password
                },
                {
                    withCredentials: true,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            set(() => ({user: null}));
        }catch(err){
            set({userError: err?.response?.data?.message || err?.message || "Failed to delete user"});
        }finally{
            set({userLoading: false});
        }
    }
}));