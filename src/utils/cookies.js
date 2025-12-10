export default class Cookies {
    /**
     * Sets a cookie with the given name, value, and expiration in days.
     * @param name {string} The name of the cookie
     * @param value {string} The value of the cookie
     * @param days {number} Number of days until the cookie expires (default is 7)
     * @returns {void}
     */
    static set(name, value, days=7) {
        if (typeof document === 'undefined') return;
        const expires = new Date(Date.now() + (days * 864e5)).toUTCString();
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
        if (typeof location !== 'undefined' && location.protocol === 'https:') cookie += '; Secure';
        document.cookie = cookie;
    }

    /**
     * Gets the value of a cookie by name.
     * @param name {string} The name of the cookie
     * @returns {string|null} The value of the cookie, or null if not found
     */
    static get(name) {
        if (typeof document === 'undefined') return null;
        const encodedName = encodeURIComponent(name) + '=';
        const parts = document.cookie.split('; ');
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].indexOf(encodedName) === 0) {
                return decodeURIComponent(parts[i].substring(encodedName.length));
            }
        }
        return null;
    }

    /**
     * Deletes a cookie by name.
     * @param name {string} The name of the cookie
     * @returns {void}
     */
    static delete(name) {
        this.set(name, '', -1);
    }
}