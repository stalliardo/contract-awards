import { getDaysSinceOct01, getMonthsInFinancialOrder } from "./DateUtils";

export const getCoreTotal = (items) => {
    let sum = 0;

    items.forEach((item) => {
        sum += parseInt(item.core);
    });

    return sum;
}

export const generateCoreTotalsData = (data, authenticatedUser) => {
    const summaryTableData = [];
    const filteredData = [];

    if (authenticatedUser.locations) {
        authenticatedUser.locations.forEach((location) => {
            filteredData.push(...data.filter(d => d.location === location));
        })

        filteredData.forEach((item) => {
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
    }
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
                if (item.location !== "Europe" && item.location !== "M&E") {
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

export const generateUkCoreTenderTotals = (data, authenticatedUser) => {
    const totals = {
        uk: [],
        specials: [],
        all: [],
    };
    const monthsInFinancialOrder = getMonthsInFinancialOrder();

    const filteredData = [];

    if(authenticatedUser.locations) {
        authenticatedUser.locations.forEach((location) => {
            filteredData.push(...data.filter(d => d.location === location));
        })

        monthsInFinancialOrder.forEach((month) => {
            let ukCoreTotal = 0;
            let specialsTotal = 0;
            let allTotal = 0;
    
            filteredData.forEach((d) => {
                d.items.forEach((item) => {
                    if (item.month === month) {
                        if (d.location !== "Europe" && d.location !== "M&E") {
                            ukCoreTotal += item.value;
                        } else {
                            specialsTotal += item.value;
                        }
    
                        allTotal += item.value;
                    }
                })
            })
    
            totals.specials.push({ month, specialsTotal });
            totals.uk.push({ month, ukCoreTotal });
            totals.all.push({ month, sum: allTotal });
    
            ukCoreTotal = 0;
            specialsTotal = 0;
        })
    }

    return totals;
}

export const generateCumalitiveTenderTotals = (data, authenticatedUser) => {
    const filteredData = [];
    const formattedData = [];

    if(authenticatedUser.locations){
        authenticatedUser.locations.forEach((location) => {
            filteredData.push(...data.filter(d => d.location === location));
        })

        filteredData.forEach((d) => {
            const obj = { location: d.location };
            const sum = d.items.reduce((prev, cur) => parseInt(prev) + parseInt(cur.value), 0);
    
            obj.sum = sum;
    
            formattedData.push(obj);
        })
    }
    return formattedData;
}

export const generateUKTenendersCumaltiveTotal = (data) => {

    const filteredData = data.filter((item) => item.location !== "Europe" && item.location !== "M&E");

    return filteredData.reduce((total, target) => parseInt(total) + parseInt(target.sum), 0);
}

export const generateSpecialCumalitiveTotals = (data) => {
    const filteredData = data.filter((item) => item.location === "Europe" || item.location === "M&E");

    return filteredData.reduce((total, target) => parseInt(total) + parseInt(target.sum), 0);
}

export const generateUKTargetTotals = (data) => {
    const filteredData = data.filter((item) => item.location !== "Europe" && item.location !== "M&E");

    return filteredData.reduce((total, target) => total + parseInt(target.targetValue), 0);
}

export const generateSpecialTargetTotals = (data) => {
    const filteredData = data.filter((item) => item.location === "Europe" || item.location === "M&E");

    return filteredData.reduce((total, target) => total + parseInt(target.targetValue), 0);
}

export const generateTargetAmountToDate = (annualAmount, financialYear) => {
    if (annualAmount === 0) return 0;

    const daysSinceOct01 = getDaysSinceOct01(financialYear);

    const dailyAmount = annualAmount / 365;
    const targetAmountTodate = dailyAmount * daysSinceOct01;

    return Math.round(targetAmountTodate);
}

export const generateTargetAcheivedPercentage = (annualAmount, cumalitiveTotal, financialYear) => {
    if (annualAmount === 0) return 0;

    const targetToDate = generateTargetAmountToDate(annualAmount, financialYear);
    const targetAchieved = 100 / targetToDate * cumalitiveTotal;

    if (targetAchieved < 1 && targetAchieved > 0) {
        return Math.round(targetAchieved);
    }

    return Math.round(targetAchieved);
}

export const generateCompanyPerformanceCumalitiveTotals = (monthlyCoreTotals, monthlyTargetTotal) => {
    const totals = []
  
    for(let i = 0; i < monthlyCoreTotals.length; i++) {
      if(i === 0) {
        const result = monthlyCoreTotals[i].sum - monthlyTargetTotal;
  
        totals.push({column: monthlyCoreTotals[i].column, sum: result})
      } else {
  
        let sumCounter = 0;
  
        for(let x = 0; x <= i; x++) {
          sumCounter += monthlyCoreTotals[i - x].sum;
        }
  
        const result = sumCounter - monthlyTargetTotal * (i + 1);
  
        totals.push({column: monthlyCoreTotals[i].column, sum: result})
        sumCounter = 0;
      }
    }
  
    return totals;
  }