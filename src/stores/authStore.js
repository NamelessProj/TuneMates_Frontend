import {create} from 'zustand';

const storageKey = 'TuneMatesUserInfo';
const tokenStorageKey = 'TuneMatesUserInfoToken';
const tokenStorageExpiresAtKey = 'TuneMatesUserInfoTokenExpiresAt';

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null,
    userToken: localStorage.getItem(tokenStorageKey) ? JSON.parse(localStorage.getItem(tokenStorageKey)) : null,
    userTokenExpiresAt: localStorage.getItem(tokenStorageExpiresAtKey) ? JSON.parse(localStorage.getItem(tokenStorageExpiresAtKey)) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem(storageKey, JSON.stringify(data));
    },

    setUserToken: (token) => {
        const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now
        set(() => ({userToken: token, userTokenExpiresAt: expiresAt}));
        localStorage.setItem(tokenStorageKey, JSON.stringify(token));
        localStorage.setItem(tokenStorageExpiresAtKey, JSON.stringify(expiresAt));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        set(() => ({userToken: null}));
        set(() => ({userTokenExpiresAt: null}));
        localStorage.removeItem(storageKey);
        localStorage.removeItem(tokenStorageKey);
        localStorage.removeItem(tokenStorageExpiresAtKey);
    }
}));