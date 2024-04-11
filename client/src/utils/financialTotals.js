import { getDaysSinceOct01, getMonthsInFinancialOrder } from "./DateUtils";

export const getCoreTotal = (items) => {
    let sum = 0;

    items.forEach((item) => {
        sum += parseInt(item.core);
    });

    return sum;
}

export const generateCoreTotalsData = (data) => {
    const summaryTableData = [];

    data.forEach((item) => {
        let sum = 0;

        if (item.items.length) {
            item.items.forEach((i) => {
                sum += parseInt(i.core);
            })
        }

        summaryTableData.push({
            location: item.location,
            month: item.month,
            sum
        })
    });

    return summaryTableData;
}

export const generateUkCoreTotals = (data) => {
    const totals = {
        uk: [],
        specials: []
    };
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    monthsInFinancialOrder.forEach((month) => {
        let ukCoreTotal = 0;
        let specialsTotal = 0;

        data.forEach((item) => {
            if (item.month === month) {
                if (item.location !== "Special Projects" && item.location !== "M&E") {
                    ukCoreTotal += item.sum;
                } else {
                    specialsTotal += item.sum;
                }
            }
        })

        totals.specials.push({ month, specialsTotal });
        totals.uk.push({ month, ukCoreTotal });

        ukCoreTotal = 0;
        specialsTotal = 0;
    })

    return totals;
}

export const generateUKTargetTotals = (data) => {
    const filteredData = data.filter((item) => item.location !== "Special Projects" && item.location !== "M&E");

    return filteredData.reduce((total, target) => total + parseInt(target.targetValue), 0);
}

export const generateSpecialTargetTotals = (data) => {
    const filteredData = data.filter((item) => item.location === "Special Projects" || item.location === "M&E");

    console.log('Filtered = = = ',  filteredData);
    return filteredData.reduce((total, target) => total + parseInt(target.targetValue), 0);
}

export const generateTargetAmountToDate = (annualAmount, cumalitiveTotal) => {
    if (annualAmount === 0) return 0;

    const daysSinceOct01 = getDaysSinceOct01();
    const dailyAmount = Math.round(annualAmount / 365);
    const targetAmountTodate = dailyAmount * daysSinceOct01;

    return targetAmountTodate;
}

export const generateTargetAcheivedPercentage = (annualAmount, cumalitiveTotal) => {
    if (annualAmount === 0) return 0;

    const targetToDate = generateTargetAmountToDate(annualAmount, cumalitiveTotal);
    const targetAchieved = 100 / targetToDate * cumalitiveTotal;

    if(targetAchieved < 1 && targetAchieved > 0) {
        return targetAchieved.toFixed(2);
    }

    return Math.round(targetAchieved);
}