import {create} from 'zustand';

const storageKey = 'TuneMatesUserInfo';

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null,
    userToken: localStorage.getItem(storageKey.concat("Token")) ? JSON.parse(localStorage.getItem(storageKey.concat("Token"))) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem(storageKey, JSON.stringify(data));
    },

    setUserToken: (token) => {
        set(() => ({userToken: token}));
        localStorage.setItem(storageKey.concat("Token"), JSON.stringify(token));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        set(() => ({userToken: null}));
        localStorage.removeItem(storageKey);
        localStorage.removeItem(storageKey.concat("Token"));
    }
}));