const monthsInFinancialOrderWithAllOption = [
    'All', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const monthsInFinancialOrder = [
  'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const monthsInOrder = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// export const generateFinancialYearMonths = () => {
//     // needs to be based on the selected year TODO

//     const monthsForTable = [];
//     const currentMonth = new Date().getMonth() + 1; // Get the current month (1-indexed)
//     const currentYear = new Date().getFullYear();
//     let startMonth = 10; // October
//     let startYear = currentYear;

//     // If the current month is before October, start from October of the previous year
//     if (currentMonth < startMonth) {
//         startYear--;
//     }

//     const monthNames = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     for (let i = 0; i < 12; i++) {
//         const month = (startMonth + i - 1) % 12; // Adjust month index to start from October
//         const year = startYear + Math.floor((startMonth + i - 1) / 12); // Adjust year accordingly
//         const formattedMonth = `${monthNames[month]}-${String(year).slice(-2)}`;
//         monthsForTable.push(formattedMonth);
//     }

//     return monthsForTable;
// }

export const generateFinancialYearMonths = (financialYear) => {
  // Split the financial year into the start and end years
  const [startYearPart, endYearPart] = financialYear.split('/');
  const startYear = parseInt(`20${startYearPart}`, 10); // Convert to 4-digit year
  const endYear = parseInt(`20${endYearPart}`, 10);

  const monthsForTable = [];
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Start from October of the starting year and generate the next 12 months
  let startMonth = 10; // October

  for (let i = 0; i < 12; i++) {
    const monthIndex = (startMonth + i - 1) % 12; // Adjusted for 0-based index
    const yearOffset = Math.floor((startMonth + i - 1) / 12); // Adjust year if necessary
    const monthName = monthNames[monthIndex];

    // Determine the correct year for each month
    const year = startYear + yearOffset;
    const formattedMonth = `${monthName}-${String(year).slice(-2)}`;

    monthsForTable.push(formattedMonth);
  }

  return monthsForTable;
};

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


    return monthsInFinancialOrderWithAllOption.map((month) => {

        // crazy conditional string below is to generate a dynamic year string needs testing
        monthString = counter < 3 ? `${month}-${isYearEven ? (parseInt(financialYearFromDiary) - 1) : financialYearFromDiary}` : `${month}-${isYearEven ? financialYearFromDiary : (parseInt(financialYearFromDiary) + 1)}`;
        counter++;

        return { value: month }
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

// Function to get the current financial year in the format "23/24"
export const getCurrentFinancialYear = () =>  {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 for January, 11 for December
  
    if (currentMonth >= 9) {
      // October (9) or later is the start of a new financial year
      const startYear = currentYear;
      const endYear = currentYear + 1;
      return `${startYear.toString().slice(-2)}/${endYear.toString().slice(-2)}`;
    } else {
      // Before October, we're still in the previous financial year
      const startYear = currentYear - 1;
      const endYear = currentYear;
      return `${startYear.toString().slice(-2)}/${endYear.toString().slice(-2)}`;
    }
  }

  // Function to generate a list of financial year strings
  // export const generateFinancialYearOptions = (baseYear = '23/24') => {
    export const generateFinancialYearOptions = (baseYear = '22/23') => {
    const currentFinancialYear = getCurrentFinancialYear();
  
    const startYear = parseInt(currentFinancialYear.slice(0, 2), 10);
    const endYear = parseInt(currentFinancialYear.slice(3, 5), 10);
  
    const baseStartYear = parseInt(baseYear.slice(0, 2), 10);
    const baseEndYear = parseInt(baseYear.slice(3, 5), 10);
  
    const financialYears = [];
    let currentStart = startYear;
    let currentEnd = endYear;
  
    while (currentStart >= baseStartYear) {
      financialYears.push(`${currentStart.toString().padStart(2, '0')}${currentEnd.toString().padStart(2, '0')}`);
      currentStart -= 1;
      currentEnd -= 1;
    }
  
    return financialYears//.reverse(); // Optional: Reverse to display in chronological order
  }
  
  export const getFinancialYearString = () => { // returns the year streing as 2324
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 for January, 11 for December
  
    if (currentMonth >= 9) {
      // If October or later, the financial year starts this year
      const startYear = currentYear;
      const endYear = currentYear + 1;
      return `${startYear.toString().slice(-2)}${endYear.toString().slice(-2)}`;
    } else {
      // If before October, the financial year started last year
      const startYear = currentYear - 1;
      const endYear = currentYear;
      return `${startYear.toString().slice(-2)}${endYear.toString().slice(-2)}`;
    }
  }