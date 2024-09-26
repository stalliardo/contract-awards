
const Location = require('../models/Location');
const { getVoidLocationsForYear } = require('../utils/locationUtil');

exports.addLocation = async (req, res) => {
  try {
    // TODO - when this is called and successful, will also need to generate more t=defaults for the tender data
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).send(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getAllLocations = async (req, res) => {

  // Handle locations that are no longer required.
  // Will still need to load the location data that was used in a previopus year.

  // SCENARIO:
  // Matt C has advised that AWE will be rolled into Avonmouth in the upcoming financail year (24/25).
  // So the AWE location will not be required in the new finacncial year but will still need to be readable when viewing previous years data.

  // Options:
  // 1 - Allow the "generateAllDataForYear" function to still create the location data but manually remove from the databse.
  // 2 - Filter the locations here based on the current year and an array of "noLongerUsedLocations"

  // 3 - Create a year and location matrix that checks the selectedFinacialYear and loads the appropriate locations based off of that.

  const { financialYear } = req.params;
  
  console.log('financtrl year = ', financialYear);

  

  const voidLocations = getVoidLocationsForYear(financialYear);

  console.log('void locs = ', voidLocations);

  // Where will the above need to be used?
    // A - Whenever the locations are obtained, so this function
    // B - Whenever initial data is generated, but i think that calls this function anyway

  try {
    // Find all Locations records
    const locations = await Location.find().exec();

    // Now filter out the locations based on the matrix:

    const filtertedLocations = locations.filter(location => !voidLocations.includes(location.name));

    res.status(201).send(filtertedLocations);
  } catch (error) {
    res.status(400);
    console.log('Error getting locations: ', error);
  }
}
