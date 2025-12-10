/**
 * Focuses an element by its ID.
 * @param id {string} The ID of the element to focus
 * @returns {void | undefined}
 */
const focusById = (id) => document.getElementById(id)?.focus();

export default focusById;