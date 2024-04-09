// Demo function to test creating the records for the whole year

const locations = [
    "Avonmouth",
    "Basingstoke",
    "Feltham",
    "Eastern",
    "Birmingham",
    "Glasgow",
    "London",
    "Leeds",
    "Manchester",
    "Newcastle",
    "AWE",
]

const months = [
    'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const tables = [];

// TODO
// Below works just needs testing and rewriting to actually save data to the table
function generateTableForYear() {
    console.log('generating tables');
    const year = 2024; // Start year of the financial year
    const endYear = 2025; // End year of the financial year
    let counter = 0;

    // for (let year = startYear; year <= endYear; year++) {
        for (const location of locations) {
            counter = 0;
            for (const month of months) {
               tables.push({
                    year: counter < 3 ? year : year + 1,
                    month,
                    location,
                    items: []
                    // Add other fields as needed
                });
                // await awardsDiary.save();
                counter++;
            }
        }
    // }

    // generating tables complete

}

module.exports = { generateTableForYear }