export const LOCATIONS = {
    AVONMOUTH: "Avonmouth",
    AWE: "Awe",
    BASINGSTOKE: "Basingstoke",
    FELTHAM: "Feltham",
    EASTERN: "Eastern",
    BIRMINGHAM: "Birmingham",
    GLASGOW: "Glasgow",
    LONDON: "London",
    LEEDS: "Leeds",
    MANCHESTER: "Manchester",
    NEWCASTLE: "Newcastle"
}

export const getLocations = () => {
    // TODO Will eventually be dynaminic and return only the associated locations

    // For now just return all locations...

    return Object.values(LOCATIONS).map(location => location);

   
}