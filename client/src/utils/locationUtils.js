import { LOCATIONS } from "./constants";

// TODO -> make dynamic based on roles matrix

export const getLocations = () => {
    // TODO Will eventually be dynaminic and return only the associated locations
    // Will ensure locations are returned in alphabetical order
    // For now just return all locations...

    // This needs to be changed to use the locations in the database
    return Object.values(LOCATIONS).map(location => location);   
}

export const generateLocationOptionsForSelectMenu = () => {
    return getLocations().map((location) => {
        return { value: location }
    });
}