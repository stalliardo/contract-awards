export const getCoreTotal = (items) => {
    let sum = 0;

    items.forEach((item) => {
        sum += parseInt(item.core);
        // return the sum
    });

    return sum;
}

export const generateDataForSummaryTable = (data) => {
    console.log('called generate suammary data');
    // loop overe the data will only need location, month and corevalues for each place as depicted belwo
}

// const data = [
//     {
//       location: "Location A",
//       months: [
//         {
//           month: "January",
//           items: [
//             { core: 100 },
//             { core: 200 },
//             // More core values for January
//           ]
//         },
//         {
//           month: "February",
//           items: [
//             { core: 150 },
//             { core: 250 },
//             // More core values for February
//           ]
//         },
//         // More months for Location A
//       ]
//     },
//     {
//       location: "Location B",
//       months: [
//         // Months with core values for Location B
//       ]
//     },
//     // More locations with their respective months and core values
//   ]