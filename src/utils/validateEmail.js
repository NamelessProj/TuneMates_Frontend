/**
 * Validates if the given string is a valid email format.
 * @param email {string} The email string to validate
 * @returns {boolean} `true` if valid email, `false` otherwise
 */
const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
}

export default validateEmail;