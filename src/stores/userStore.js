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
            set({userError: err?.response?.data?.message || err?.message || "Failed to register"});
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
            set({userError: err?.response?.data?.message || err?.message || "Failed to login"});
        }finally{
            set({userLoading: false});
        }
    }
}));