/**
 * Parse milliseconds to minutes and seconds format (M:SS)
 * @param ms {number} The time in milliseconds
 * @returns {string} The time in M:SS format
 */
const parseMsToMinutesSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default parseMsToMinutesSeconds;