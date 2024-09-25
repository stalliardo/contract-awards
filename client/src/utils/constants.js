export const LOCATIONS = {
    AVONMOUTH: "Avonmouth",
    AWE: "AWE",
    BASINGSTOKE: "Basingstoke",
    BIRMINGHAM: "Birmingham",
    EASTERN: "Eastern",
    FELTHAM: "Feltham",
    GLASGOW: "Glasgow",
    LEEDS: "Leeds",
    LONDON: "London",
    MANCHESTER: "Manchester",
    NEWCASTLE: "Newcastle",
    EUROPE: "Europe",
    M_AND_E: "M&E"
}

export const TARGET_CATEGORIES = {
    CONTRACT_AWARDS: "contract-awards",
    TENDERS_SUBMITTED: "tenders-submitted"
}

export const COLOURS = {
    GREEN: "#299e20",
    RED: "red"
}

export const ROLES = {
    CA01: "CA01",
    CA02: "CA02",
    CA03: "CA03",
}

export const REGIONS = {
    All: "All",
    London: "London",
    Northern: "Northern",
    Southern: "Southern",
    Special: "Europe, Birmingham & Glasgow",
    "M&E": "M&E"    
}

export const extractADFriendlyRegionalName = (region) => {
    const itemIndex = Object.values(REGIONS).findIndex(item => item === region);

    return `${Object.keys(REGIONS).map(r => r)[itemIndex]} Region`;
}

export const LOCATIONS_IN_COMPANY_ORDER = [
    "Avonmouth",
    "Basingstoke",
    "Feltham",
    "Eastern",
    "Birmingham",
    "Glasgow",
    "London",
    "Leeds",
    "Manchester",
    "Newcastle",
    "AWE",
    "Europe",
    "M&E"
];

export const sortLocations = (unSortedLocations) => {
    let sortedLocations = [];

    if(unSortedLocations.length === 13) {
        sortedLocations = [...unSortedLocations].sort((a, b) => {
            return LOCATIONS_IN_COMPANY_ORDER.indexOf(a) - LOCATIONS_IN_COMPANY_ORDER.indexOf(b);
        })
    } else {
        sortedLocations = unSortedLocations
    }

    return sortedLocations;
}

export const sortLocationsObject = (unSortedLocations) => {
    let sortedLocations = [];

    if(unSortedLocations.length === 13) {
        sortedLocations = [...unSortedLocations].sort((a, b) => {
            return LOCATIONS_IN_COMPANY_ORDER.indexOf(a.name) - LOCATIONS_IN_COMPANY_ORDER.indexOf(b.name);
        })
    } else {
        sortedLocations = unSortedLocations
    }

    return sortedLocations;
}