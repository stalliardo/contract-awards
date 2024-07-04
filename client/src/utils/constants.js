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
    London: "London",
    Northern: "Northern",
    Southern: "Southern",
    SpecialsBirminghamAndGlasgow: "Special Projects, Birmingham & Glasgow",
    MAndE: "M&E"
}

export const extractADFriendlyRegionalName = (region) => {

    console.log('region = ', region);
 
    const itemIndex = Object.values(REGIONS).findIndex(item => item === region);

    return Object.keys(REGIONS).map(r => r)[itemIndex];
    

}