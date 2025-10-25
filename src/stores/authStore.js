import {create} from 'zustand';

const storageKey = 'TuneMatesUserInfo';

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem(storageKey, JSON.stringify(data));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        localStorage.removeItem(storageKey);
    }
}));