export const extractFirstAndLastName = (email) => {
    // Split the email address by '@' symbol
    const parts = email.split('@');

    // Extract the first part before '@'
    const username = parts[0];

    // Split the username by '.'
    const names = username.split('.');

    // Extract the first and last names
    const firstName = names[0];
    const lastName = names[1];

    return firstName + " " + lastName;
}

export const removeSlashFromyearString = (str) => {
    return str.split("/").join("");
}

export const addSlashToYearString = (str) => {
    // Ensure the input string is exactly 4 characters long
    if (str.length !== 4) {
        throw new Error('Invalid year string length. Expected a 4-character string.');
    }

    // Insert a slash between the second and third characters
    const firstPart = str.slice(0, 2); // Extract the first two characters
    const secondPart = str.slice(2, 4); // Extract the last two characters
    
    return `${firstPart}/${secondPart}`; // Combine them with a slash
};