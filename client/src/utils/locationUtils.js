import { LOCATIONS } from "./constants";

export const getLocations = () => {
    // This needs to be changed to use the locations in the database
    return Object.values(LOCATIONS).map(location => location);   
}

export const generateLocationOptionsForSelectMenu = () => {
    return getLocations().map((location) => {
        return { value: location }
    });
}