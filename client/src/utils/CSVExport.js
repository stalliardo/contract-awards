import { generateFinancialYearMonths, getMonthsInFinancialOrder } from "./DateUtils";
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from "./financialTotals";
import { addSlashToYearString } from "./stringUtils";

export const downloadCSVFile = (csvString) => {
    // Create and trigger download
    const csvFile = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = 'contract_awards.csv';
    link.click();
    window.alert("CSV successfully generated and downloaded!");
}

export const generateCSVString = (data, selectedFinancialYear) => {
    const csvRows = [];
    const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
    const headers = ["location", ...months, "Cumalitive Totals", "Monthly Target", "Yearly Target", "Target to Date", "%TA"]
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    csvRows.push(headers.join(","));

    data.locations.forEach((location, index) => {
        if (location.name !== "M&E" && location.name !== "Special Projects") {
            const rowItems = data.nonSpecialRows.coreTotals.filter((item) => item.location === location.name);

            // sort the data so it always comes back in the correct financial order  
            rowItems.sort((a, b) => {
                return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
            });

            const rowSums = rowItems.map(item => item.sum);
            const cumalativeTotalsSingle = data.nonSpecialRows.cumalitiveTotals[index]?.cumalitiveTotal;
            const monthTarget = parseInt(data.nonSpecialRows.targets.find((item) => item.location === location.name)?.monthTarget);
            const yearlyTarget = monthTarget * 12;
            const targetAmountTodate = Math.round(generateTargetAmountToDate(yearlyTarget, cumalativeTotalsSingle));
            const targetPercentageAcheived = generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotalsSingle);
            const items = [location.name, ...rowSums, cumalativeTotalsSingle, monthTarget, yearlyTarget, targetAmountTodate, targetPercentageAcheived];

            csvRows.push(items.join(","));
        }
    })

    const ukCoreTotalRow = data.ukCoreTotalRow.coreTotals;
    console.log('ukCoreTotalRow = ', ukCoreTotalRow);

    // Create a mutable copy of the array as it is frozen
    let mutableUkCoreTotalRow = [...ukCoreTotalRow];

    // Sort the mutable array based on the custom order
    mutableUkCoreTotalRow.sort((a, b) => {
        return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
    });

    const ukCoreTotals = mutableUkCoreTotalRow.map(item => item.ukCoreTotal);
    const ukCoreTotalCumalitive = data.ukCoreTotalRow.cumalativeTotals;
    const ukCoreTotalTarget = data.ukCoreTotalRow.targets;
    const ukCoreTotalYearlyTarget = ukCoreTotalTarget * 12;
    const ukCoreTargetAmountTodate = Math.round(generateTargetAmountToDate(ukCoreTotalYearlyTarget, ukCoreTotalCumalitive))
    const ukCoreTargetPercentageAcheived = generateTargetAcheivedPercentage(ukCoreTotalYearlyTarget, ukCoreTotalCumalitive);

    csvRows.push(["UK Core Total", ...ukCoreTotals, data.ukCoreTotalRow.cumalativeTotals, ukCoreTotalTarget, ukCoreTotalYearlyTarget, ukCoreTargetAmountTodate, ukCoreTargetPercentageAcheived])

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

    const totalRow = data.totalsRow.coreTotals;

    // Create a mutable copy of the array as it is frozen
    let mutableTotalRow = [...totalRow];

    // Sort the mutable array based on the custom order
    mutableTotalRow.sort((a, b) => {
        return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
    });

    const Totals = mutableTotalRow.map(item => item.sum);
    const totalCumalitive = data.totalsRow.cumalativeTotals;
    const totalTarget = data.totalsRow.targets;
    const totalYearlyTarget = totalTarget * 12;
    const targetAmountTodate = Math.round(generateTargetAmountToDate(totalYearlyTarget, totalCumalitive))
    const targetPercentageAcheived = generateTargetAcheivedPercentage(totalYearlyTarget, totalCumalitive);

    csvRows.push(["Total", ...Totals, totalCumalitive, totalTarget, totalYearlyTarget, targetAmountTodate, targetPercentageAcheived])

    csvRows.push("");
    csvRows.push("Company Performance Monthly");
    csvRows.push([" ", ...data.companyPerformanceMothlyRow].join(","));

    csvRows.push("");
    csvRows.push("Company Performance Cumalitive");
    csvRows.push([" ", ...data.companyPerformanceCumalitiveRow].join(","));

    // Create CSV string
    const csvString = csvRows.join('\n');

    downloadCSVFile(csvString)
}