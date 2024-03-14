const monthsInFinancialOrder = [
    'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const monthsInOrder = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth();

    return monthsInOrder[month];
}