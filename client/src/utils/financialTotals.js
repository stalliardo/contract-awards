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

        if(item.items.length){
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
    const totals = [];
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    monthsInFinancialOrder.forEach((month) => {
        let ukCoreTotal = 0;

        data.forEach((item) => {
            if(item.month === month) {
                ukCoreTotal += item.sum;
            }
        })

        totals.push({month, ukCoreTotal});

        ukCoreTotal = 0;
    })

    return totals;
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
    console.log('targetachievcn = ', targetAchieved);

    return Math.round(targetAchieved);
    
    // Get the number of days since oct01
}

// logic for the targetAchieved %:

// 1: Annual amount / days
// 2: get the days since oct1 to current data
// 3: 1 * 2 = the percentage

// example 
// annual = 1,200,000
// days = 365
// dayssince oct 01 = 150
// so 1200000 / 365 * 150 = 493,150 to date

// Then 100 / toDate percentage * the currentTotal

// 100 / 493000 * 245000 ->  would return 50%