import { generateFinancialYearMonths, getMonthsInFinancialOrder } from "./DateUtils";
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from "./financialTotals";
import { addSlashToYearString } from "./stringUtils";

// Create and trigger download
export const downloadCSVFile = (csvString, fileName) => {
    const csvFile = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = `${fileName}.csv`;
    link.click();
    window.alert("CSV successfully generated and downloaded!");
}

export const generateCSVString = (data, selectedFinancialYear) => {
    const csvRows = [];
    const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
    const headers = ["location", ...months, "Cumalitive Totals", "Monthly Target", "Yearly Target", "Target to Date", "%TA"]
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    csvRows.push(headers.join(","));

    console.log('data.locations = ', data.locations);

    data.locations.forEach((location, index) => {
        if (location.name !== "M&E" && location.name !== "Europe") {
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
    const ukCoreTargetAmountTodate = Math.round(generateTargetAmountToDate(ukCoreTotalYearlyTarget, ukCoreTotalCumalitive));
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

    const csvString = csvRows.join('\n');
    downloadCSVFile(csvString, "contract-awards");
}

export const generateCSVForTenders = (data, selectedFinancialYear) => {
    const csvRows = [];
    const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
    const headers = ["location", ...months, "Cumalitive Totals", "Monthly Target", "Yearly Target", "Target to Date", "%TA"]
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    csvRows.push(headers.join(","));

    data.coreTotals.forEach((item) => {
        const formattedItems = [...item.items];

        formattedItems.sort((a, b) => {
            return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
        });

        let targetAcheived = generateTargetAcheivedPercentage(item.yearlyTarget, item.cumalitiveTotal);

        if (isNaN(targetAcheived)) {
            targetAcheived = 0;
        }

        const coreValueRow = formattedItems.map(item => item.value);
        csvRows.push([item.location, ...coreValueRow, item.cumalitiveTotal, item.monthTarget, item.yearlyTarget, item.targetToDate, targetAcheived].join(','))
    })

    const ukCoreTotals = data.ukCoreTotalsRow.items.uk.map(item => item.ukCoreTotal);
    csvRows.push([data.ukCoreTotalsRow.location, ...ukCoreTotals, data.ukCoreTotalsRow.cumalitiveTotal, data.ukCoreTotalsRow.monthTarget, data.ukCoreTotalsRow.yearlyTarget, data.ukCoreTotalsRow.targetToDate, data.ukCoreTotalsRow.targetAcheived].join(','))

    data.specialTotals.forEach((item) => {
        const formattedItems = [...item.items];

        formattedItems.sort((a, b) => {
            return monthsInFinancialOrder.indexOf(a.month) - monthsInFinancialOrder.indexOf(b.month);
        });

        let targetAcheived = generateTargetAcheivedPercentage(item.yearlyTarget, item.cumalitiveTotal);

        if (isNaN(targetAcheived)) {
            targetAcheived = 0;
        }

        const coreValueRow = formattedItems.map(item => item.value);
        csvRows.push([item.location, ...coreValueRow, item.cumalitiveTotal, item.monthTarget, item.yearlyTarget, item.targetToDate, targetAcheived].join(','))
    });

    const totalItems = data.totals.items.map(item => item.sum);
    csvRows.push([data.totals.location, ...totalItems, data.totals.cumalitiveTotal, data.totals.monthTarget, data.totals.yearlyTarget, data.totals.targetToDate, data.totals.targetAcheived].join(','))

    csvRows.push("");
    csvRows.push("Company Performance Monthly");
    csvRows.push([" ", ...data.monthlyPerformaceRow.items].join(","));

    csvRows.push("");
    csvRows.push("Company Performance Cumalitive");
    csvRows.push([" ", ...data.cumalitivePerformanceRow.items].join(","));

    const csvString = csvRows.join('\n');
    downloadCSVFile(csvString, "tenders-submitted");
}