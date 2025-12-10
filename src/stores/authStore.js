import {create} from 'zustand';

const storageKey = 'TuneMatesUserInfo';
const tokenStorageKey = 'TuneMatesUserInfoToken';
const tokenStorageExpiresAtKey = 'TuneMatesUserInfoTokenExpiresAt';

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null,
    userToken: localStorage.getItem(tokenStorageKey) ? JSON.parse(localStorage.getItem(tokenStorageKey)) : null,
    userTokenExpiresAt: localStorage.getItem(tokenStorageExpiresAtKey) ? JSON.parse(localStorage.getItem(tokenStorageExpiresAtKey)) : null,

    /**
     * Sets the user credentials both in the store and in localStorage.
     * @param data {object} The user information to store
     * @returns {void}
     */
    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem(storageKey, JSON.stringify(data));
    },

    /**
     * Sets the user token both in the store and in localStorage.
     * @param token {string} The user token to store
     * @returns {void}
     */
    setUserToken: (token) => {
        const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now
        set(() => ({userToken: token, userTokenExpiresAt: expiresAt}));
        localStorage.setItem(tokenStorageKey, JSON.stringify(token));
        localStorage.setItem(tokenStorageExpiresAtKey, JSON.stringify(expiresAt));
    },

    /**
     * Logs out the user by clearing the store and localStorage.
     * @returns {void}
     */
    logout: () => {
        set(() => ({userInfo: null}));
        set(() => ({userToken: null}));
        set(() => ({userTokenExpiresAt: null}));
        localStorage.removeItem(storageKey);
        localStorage.removeItem(tokenStorageKey);
        localStorage.removeItem(tokenStorageExpiresAtKey);
    }
}));