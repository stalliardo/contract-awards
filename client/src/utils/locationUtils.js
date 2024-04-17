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