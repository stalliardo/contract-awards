import { generateFinancialYearMonths } from "./DateUtils";
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from "./financialTotals";
import { addSlashToYearString } from "./stringUtils";

export const exportToCSV = (data, selectedFinancialYear) => {
    const csvRows = [];


    const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
    const headers = ["location", ...months, "Cumalitive Totals", "Monthly Target", "Yearly Target", "Target to Date", "%TA"]

    console.log('headers = ', headers);


    csvRows.push(headers.join(","));
    data.locations.forEach((location, index) => {
        const rowItems = data.nonSpecialRows.coreTotals.filter((item) => item.location === location.name);
        const rowSums = rowItems.map(item => item.sum);
        const cumalativeTotalsSingle = data.nonSpecialRows.cumalitiveTotals[index]?.cumalitiveTotal;
        const monthTarget = parseInt(data.nonSpecialRows.targets.find((item) => item.location === location.name)?.monthTarget);
        const yearlyTarget = monthTarget * 12;



        const targetAmountTodate = Math.round(generateTargetAmountToDate(yearlyTarget, cumalativeTotalsSingle))
        const targetPercentageAcheived = generateTargetAcheivedPercentage( yearlyTarget, cumalativeTotalsSingle);
        console.log('targetAmountTodate = ', typeof(targetAmountTodate));

        const items = [location.name, ...rowSums, cumalativeTotalsSingle, monthTarget, yearlyTarget, targetAmountTodate, targetPercentageAcheived];

        console.log('items = ', items);



        csvRows.push(items.join(","));
    })

    // Create CSV string
    const csvString = csvRows.join('\n');

    // Create and trigger download
    const csvFile = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = 'contract_awards.csv';
    // link.click();
}

