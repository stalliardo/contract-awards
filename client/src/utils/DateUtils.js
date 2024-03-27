const monthsInFinancialOrder = [
    'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const monthsInOrder = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

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
        monthString = counter < 3 ?  `${month}-${isYearEven ? (parseInt(financialYearFromDiary) - 1) : financialYearFromDiary}` : `${month}-${isYearEven ? financialYearFromDiary : (parseInt(financialYearFromDiary) + 1)}`;
        counter++;

        return { value: monthString }
    })
}

// Function to change this "May-2024" to this "May"
export const extractMonthFromString = (monthYearString) => {
    return monthYearString.split("-")[0];  
}