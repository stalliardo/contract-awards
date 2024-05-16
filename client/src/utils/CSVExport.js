import { generateFinancialYearMonths, getMonthsInFinancialOrder } from "./DateUtils";
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from "./financialTotals";
import { addSlashToYearString } from "./stringUtils";

export const exportToCSV = (data, selectedFinancialYear) => {
    const csvRows = [];
    const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
    const headers = ["location", ...months, "Cumalitive Totals", "Monthly Target", "Yearly Target", "Target to Date", "%TA"]
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    csvRows.push(headers.join(","));

    data.locations.forEach((location, index) => {
        if(location.name !== "M&E" && location.name !== "Special Projects"){
            const rowItems = data.nonSpecialRows.coreTotals.filter((item) => item.location === location.name);

        // sort the data so it always comes back in the correct financial order  
        rowItems.sort((a, b) => {
            return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
        });

        const rowSums = rowItems.map(item => item.sum);
        const cumalativeTotalsSingle = data.nonSpecialRows.cumalitiveTotals[index]?.cumalitiveTotal;
        const monthTarget = parseInt(data.nonSpecialRows.targets.find((item) => item.location === location.name)?.monthTarget);
        const yearlyTarget = monthTarget * 12;
        const targetAmountTodate = Math.round(generateTargetAmountToDate(yearlyTarget, cumalativeTotalsSingle))
        const targetPercentageAcheived = generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotalsSingle);
        const items = [location.name, ...rowSums, cumalativeTotalsSingle, monthTarget, yearlyTarget, targetAmountTodate, targetPercentageAcheived];

        csvRows.push(items.join(","));
        }
    })

    const specialLocations = data.specialRows.cumalitiveTotals.map((item) => item.location);

    specialLocations.forEach((location, index) => {
        const rowItems = data.specialRows.coreTotals.filter((item) => item.location === location);
        const cumalativeTotalsSingle = data.specialRows.cumalitiveTotals[index]?.cumalitiveTotal;
        const monthTarget = parseInt(data.specialRows.targets.find((item) => item.location === location)?.monthTarget);
        const yearlyTarget = monthTarget * 12;
        const targetAmountTodate = Math.round(generateTargetAmountToDate(yearlyTarget, cumalativeTotalsSingle))
        const targetPercentageAcheived = generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotalsSingle);

        // sort the data so it always comes back in the correct financial order  
        rowItems.sort((a, b) => {
            return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
        });

        const rowSums = rowItems.map((item) => item.sum);


        const items = [location, ...rowSums, cumalativeTotalsSingle, monthTarget, yearlyTarget, targetAmountTodate, targetPercentageAcheived];
        csvRows.push(items.join(","));
    })

    csvRows.push("");
    csvRows.push("Company Performance Monthly");
    csvRows.push([" ", ...data.companyPerformanceMothlyRow].join(","));

    csvRows.push("");
    csvRows.push("Company Performance Cumalitive");
    csvRows.push([" ", ...data.companyPerformanceCumalitiveRow].join(","));

    // Create CSV string
    const csvString = csvRows.join('\n');

    console.log('csv string = ', csvString);

    // Create and trigger download
    const csvFile = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = 'contract_awards.csv';
    // link.click();
}

