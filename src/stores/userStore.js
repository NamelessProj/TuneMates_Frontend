import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
    user: null,
    token: null,
    userLoading: false,
    userError: null,

    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`,
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
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`,
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
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/me`,
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
            set({user: null, userError: err?.response?.data?.message || err?.message || "Failed to edit user"});
        }finally{
            set({userLoading: false});
        }
    },

    editUserPassword: async (data, token) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/me/password`,
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
            set({user: null, userError: err?.response?.data?.message || err?.message || "Failed to edit user's password"});
        }finally{
            set({userLoading: false});
        }
    },

    connectUserToSpotify: async (code, state, token) => {
        set({userLoading: true, userError: null});
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/spotify/connect/${code}/${state}`,
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
            set({user: null, userError: err?.response?.data?.message || err?.message || "Failed to connect user to Spotify"});
        }finally{
            set({userLoading: false});
        }
    }
}));