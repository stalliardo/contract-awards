export const getCoreTotal = (items) => {
    let sum = 0;

    items.forEach((item) => {
        sum += parseInt(item.core);
        // return the sum
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
    })

    return summaryTableData;
}