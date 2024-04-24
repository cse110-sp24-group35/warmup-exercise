/**
 * Utility function to format dates in a human-readable form.
 * @param {string} dateStr - The date string in YYYY-MM-DD format.
 * @return {string} - The formatted date.
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Utility function to capitalize the first letter of each word in a string.
 * @param {string} str - The string to capitalize.
 * @return {string} - The capitalized string.
 */
function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Function to dynamically create and return a DOM element with optional classes and text.
 * @param {string} tagName - The type of element to create.
 * @param {string[]} [classes] - An optional array of classes to add.
 * @param {string} [text] - Optional text content for the element.
 * @return {Element} - The newly created DOM element.
 */
function createElement(tagName, classes = [], text = '') {
    const element = document.createElement(tagName);
    classes.forEach(cls => element.classList.add(cls));
    if (text) element.textContent = text;
    return element;
}

/**
 * Generic error handling function for logging and displaying errors.
 * @param {string} message - Error message to display.
 */
function handleError(message) {
    console.error(message);
    // Optionally, insert the error message into a designated error log element on the webpage
    const errorLog = document.getElementById('errorLog');
    if (errorLog) {
        errorLog.textContent = message; // Update the DOM with the error message
    }
}

