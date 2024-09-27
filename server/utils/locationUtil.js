exports.getVoidLocationsForYear = (financialYear) => {
    const yearAndLocationMatrix = {
        2324: {
            voidLocations: ["AWE"]
        },
        2425: {
            voidLocations: ["Basingstoke"]
        }
    }

    return yearAndLocationMatrix[financialYear].voidLocations || [];
}