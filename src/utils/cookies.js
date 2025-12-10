export default class Cookies {
    static set(name, value, days=7) {
        if (typeof document === 'undefined') return;
        const expires = new Date(Date.now() + (days * 864e5)).toUTCString();
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
        if (typeof location !== 'undefined' && location.protocol === 'https:') cookie += '; Secure';
        document.cookie = cookie;
    }

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

    static delete(name) {
        this.set(name, '', -1);
    }
}