export const getCoreTotal = (items) => {

    let sum = 0;

    items.forEach((item) => {
        console.log('cv = ', item);
        sum += parseInt(item.core);
        // return the sum
    });

    return sum;
}