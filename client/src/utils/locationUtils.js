import { LOCATIONS } from "./constants";

export const getLocations = (user) => {
    return Object.values(LOCATIONS).map(location => location);   
}

export const generateLocationOptionsForSelectMenu = (locations) => {
    return locations.map((location) => {
        return { value: location }
    });
}

export const filterOutVoidLocationsForYear = (financialYear, locations) => {
    const yearAndLocationMatrix = {
        2324: {
            voidLocations: [""]
        },
        
        2425: {
            voidLocations: ["AWE"]
        }
    }

    const voidLocations = yearAndLocationMatrix[financialYear]?.voidLocations || [];

    return locations.filter(location => !voidLocations.includes(location));
}