import { generateFinancialYearMonths } from "./DateUtils";
import { addSlashToYearString } from "./stringUtils";

// const MonthsForTableHead = (selectedFinancialYear) => {
//     const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));

//     const cells = months.map((month, i) => {
//         return <th>{month}</th>
//     })

//     return cells
// }

export const exportToCSV = (data, selectedFinancialYear) => {
    const csvRows = [];


    const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
    const headers = ["location", ...months, "Cumalitive Totals", "Monthly Target", "Yearly Target", "Target to Date", "%TA"]

    console.log('headers = ', headers);

    console.log('datata = ', data.nonSpecialRows.coreTotals);

    csvRows.push(headers.join(","));
    data.locations.forEach((location) => {
        const rowItems = data.nonSpecialRows.coreTotals.filter((item) => item.location === location.name);
        const rowSums = rowItems.map(item => item.sum);
        const items = [location.name, ...rowSums]
        csvRows.push(items.join(","));
    })

    // Create CSV string
    const csvString = csvRows.join('\n');

    // Create and trigger download
    const csvFile = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = 'company_tenders.csv';
    // link.click();
}

