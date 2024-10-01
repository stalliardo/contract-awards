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
    console.log('locations in fucn = ', locations);
    const yearAndLocationMatrix = {
        2324: {
            voidLocations: [""]
        },
        
        2425: {
            voidLocations: ["AWE"]
        }
    }

    const voidLocations = yearAndLocationMatrix[financialYear]?.voidLocations || [];

    console.log('after function ', locations.filter(location => !voidLocations.includes(location)));

    // Problem is this function isnt getting called after the financial yearhas been changed

    return locations.filter(location => !voidLocations.includes(location));
}