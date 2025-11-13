import {create} from 'zustand';

const storageKey = 'TuneMatesUserInfo';
const tokenStorageKey = 'TuneMatesUserInfoToken';

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null,
    userToken: localStorage.getItem(tokenStorageKey) ? JSON.parse(localStorage.getItem(tokenStorageKey)) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem(storageKey, JSON.stringify(data));
    },

    setUserToken: (token) => {
        set(() => ({userToken: token}));
        localStorage.setItem(tokenStorageKey, JSON.stringify(token));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        set(() => ({userToken: null}));
        localStorage.removeItem(storageKey);
        localStorage.removeItem(tokenStorageKey);
    }
}));