// Demo function to test creating the records for the whole year

const locations = [
    { value: "Avonmouth" },
    { value: "Basingstoke" },
    { value: "Feltham" },
    { value: "Eastern" },
    { value: "Birmingham" },
    { value: "Glasgow" },
    { value: "London" },
    { value: "Leeds" },
    { value: "Manchester" },
    { value: "Newcastle" },
    { value: "Awe" },
]

const months = [
    'October', 'November', 'December', 'January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August', 'September'
];

const tables = [
    
]

function generateTableForYear() {
    console.log('generating tables');
    const startYear = 2024; // Start year of the financial year
    const endYear = 2025; // End year of the financial year

    for (let year = startYear; year <= endYear; year++) {
        for (const location of locations) {
            for (const month of months) {
               tables.push({
                    year: month === 'October' ? year - 1 : year,
                    month,
                    location,
                    items: []
                    // Add other fields as needed
                });
                // await awardsDiary.save();
            }
        }
    }

    // generating tables complete

    console.log('Generating tables complete');
    console.log('tables = ', tables);

}

module.exports = { generateTableForYear }