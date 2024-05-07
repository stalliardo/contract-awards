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