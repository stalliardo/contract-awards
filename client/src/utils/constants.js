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
    SPECIAL_PROJECTS: "Special Projects",
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
    london: "London",
    northern: "Northern",
    southern: "Southern",
    specialsBirminghamAndGlasgow: "Special Projects, Birmingham & Glasgow",
    mAndE: "M&E"    
}

export const extractADFriendlyRegionalName = (region) => {
    const itemIndex = Object.values(REGIONS).findIndex(item => item === region);

    return `${Object.keys(REGIONS).map(r => r)[itemIndex]} region`;
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
    "Special Projects",
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