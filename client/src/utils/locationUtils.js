import { LOCATIONS } from "./constants";

export const getLocations = (user) => {
    // This needs to be changed to use the locations in the database

    console.log('get locations called + user = ', user?.locations);

    

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
            voidLocations: []
        },
        
        2425: {
            voidLocations: ["AWE"]
        }
    }

    const voidLocations = yearAndLocationMatrix[financialYear]?.voidLocations || [];
    return locations.filter(location => !voidLocations.includes(location));

    // if(voidLocations.length > 0) {
    //     console.log('top called');
    // } else {
    //     console.log('bottom called + locations = ', locations);
    //     return locations
    // }
}