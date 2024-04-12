const monthsInFinancialOrder = [
    'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const monthsInOrder = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export const generateFinancialYearMonths = () => {
    const monthsForTable = [];
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-indexed)
    const currentYear = new Date().getFullYear();
    let startMonth = 10; // October
    let startYear = currentYear;

    // If the current month is before October, start from October of the previous year
    if (currentMonth < startMonth) {
        startYear--;
    }

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    for (let i = 0; i < 12; i++) {
        const month = (startMonth + i - 1) % 12; // Adjust month index to start from October
        const year = startYear + Math.floor((startMonth + i - 1) / 12); // Adjust year accordingly
        const formattedMonth = `${monthNames[month]}-${String(year).slice(-2)}`;
        monthsForTable.push(formattedMonth);
    }

    return monthsForTable;
}

export const getMonthsInFinancialOrder = () => {
    return monthsInFinancialOrder;
}

export const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth();

    return monthsInOrder[month];
}

export const generateDateOptionsForSelectMenu = (financialYearFromDiary) => {
    let counter = 0;
    let monthString = "";
    const num = 2022
    // TODO TESTS
    //the firts part of the year will always be an odd number so can use that to determine which part of theyear was passed in
    const isYearEven = parseInt(financialYearFromDiary) % 2 === 0; // if year is even its the second part of the year

    return monthsInFinancialOrder.map((month) => {

        // crazy conditional string below is to generate a dynamic year string needs testing
        monthString = counter < 3 ? `${month}-${isYearEven ? (parseInt(financialYearFromDiary) - 1) : financialYearFromDiary}` : `${month}-${isYearEven ? financialYearFromDiary : (parseInt(financialYearFromDiary) + 1)}`;
        counter++;

        return { value: monthString }
    })
}

// Function to change this "May-2024" to this "May"
export const extractMonthFromString = (monthYearString) => {
    return monthYearString.split("-")[0];
}

export const getDaysSinceOct01 = () => {
    const today = new Date();

    // Get October 1st of the previous year
    const octoberFirstLastYear = new Date(today.getFullYear() - 1, 9, 1); // Months are 0-based, so 9 is October

    // Calculate the difference in milliseconds between today and October 1st of last year
    const timeDifference = today.getTime() - octoberFirstLastYear.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;

}