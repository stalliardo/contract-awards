import { getMonthsInFinancialOrder } from "./DateUtils";

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