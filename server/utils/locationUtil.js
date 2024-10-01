exports.getVoidLocationsForYear = (financialYear) => {
    const yearAndLocationMatrix = {
        2324: {
            voidLocations: [""]
        },
        2425: {
            voidLocations: ["AWE"]
        },
        2526: { // TODO check this is valid for this financial year
            voidLocations: ["AWE"]
        }
    }

    return yearAndLocationMatrix[financialYear].voidLocations || [];
}