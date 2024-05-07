const AwardsDiary = require('../models/AwardsDiary');
const Location = require('../models/Location');
const { getFinancialYearString } = require('../utils/DateUtils');
const { generateTenderDataForLocation } = require('./tendersController');

const months = [
  'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];


// Function to get the financial year based on the current date
function getFinancialYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0 = January, 1 = February, ..., 11 = December

  // If the current month is October or later, return the current year
  // Otherwise, return the previous year
  const financialYearStartMonth = 9; // October (index-based)
  return currentMonth >= financialYearStartMonth ? currentYear : currentYear - 1;
}

exports.createAwardsDiary = async (req, res) => {
  console.log('Create awards diary called + data = ', req.body);
  try {
    const awardsDiary = new AwardsDiary(req.body);
    await awardsDiary.save();
    res.status(201).send(awardsDiary);
  } catch (error) {
    console.log('Backend error = ', error);
    res.status(400).send(error);
  }
};

// Return all record for current year based on location
exports.getAwardsForLocation = async (req, res) => {
  const { location, financialYear } = req.query;

  console.log('Financial year from location get:', financialYear);

  try {
    // Build the query object
    const query = {};

    if (location) {
      query.location = { $regex: new RegExp('^' + location + '$', 'i') }; // Case-insensitive match
    }

    if (financialYear) {
      query.financialYear = financialYear; // Exact match
    }

    // Find AwardsDiary records that match the location and financialYear
    const awardsForLocation = await AwardsDiary.find(query).exec();

    // Populate the 'items' field for each AwardsDiary record
    await AwardsDiary.populate(awardsForLocation, { path: 'items' });

    res.status(200).json(awardsForLocation); // Return successful GET response
  } catch (error) {
    console.error('Error getting records for location:', error);
    res.status(500).json({ error: 'Internal server error' }); // Return server error
  }
};

// Return all record for current year based on location
exports.getAllAwards = async (req, res) => {

  try {
    // Find all AwardsDiary records for the given location
    const allAwards = await AwardsDiary.find().exec();

    // Populate the 'items' field for each AwardsDiary record
    await AwardsDiary.populate(allAwards, { path: 'items' });

    res.status(201).send(allAwards);
  } catch (error) {
    res.status(400);
    console.log('Error getting all records for location: ', error);
  }
}

exports.getAllAwardsDiary = async (req, res) => {
  console.log('CALLED');
  try {
    const awardsDiaryEntries = await AwardsDiary.find();
    res.send(awardsDiaryEntries);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createAwardsDiariesForYearParentFunction = async (req, res, location, financialYearString, currentFinancialYear) => {
  const promises = [];
  const data = []; // for storing the AwardsDiary instances

  let counter = 0;

  try {
    months.forEach(async (month) => {
      data.push(new AwardsDiary({
        location: location || req.body.location,
        year: currentFinancialYear + (counter >= 3 ? 1 : 0), // If counter < 3, it's current financial year, otherwise the next. old mehtod -> counter < 3 ? 2023 : 2024,
        financialYear: financialYearString,
        month
      }))
      // await awardsDiary.save();
      counter++;
    });

    // Loop the data and generate promises
    data.forEach((awardsDiaryInstance) => {
      promises.push(awardsDiaryInstance.save());
    });

    // Now call promise.all to save the data asynchronously
    await Promise.all(promises);
  } catch (error) {
    console.log('Error generatng data for location. Error: ', error);
  }
}

exports.createAwardsDiariesForYear = async (req, res) => {
  return createAwardsDiariesForYearParentFunction(req, res)
}

exports.generateAllDataForYear = async (req, res) => {
  const locationAddedPromises = [];

  // get the real locations stored in the db
  const locations = await Location.find().exec();
  const currentFinancialYear = getFinancialYear();
  const financialYearString = getFinancialYearString();


  if (!locations || locations.length === 0) {
    return res.status(404).json({ error: 'Locations not found' });
  }

  locations.forEach((location) => {
    locationAddedPromises.push(createAwardsDiariesForYearParentFunction(req, res, location.name, financialYearString, currentFinancialYear));
  })

  try {
    await Promise.all(locationAddedPromises);
    res.status(201).send({ message: "All records successfully created!" });

  } catch (error) {
    console.log('Error while calling promise.all from generateAllData: E : ', error);
    res.status(500).send(error);
  }
}

// Used when a director adds locations. Adds default data to the database
exports.generateDataForGivenLocations = async (req, res, locations) => {
  const locationAddedPromises = [];
  const currentFinancialYear = getFinancialYear();
  const financialYearString = getFinancialYearString();

  for(let i = 0; i < locations.length; i++) {
    const locationExists = await AwardsDiary.findOne({location: locations[i]})

    if(!locationExists){
      locationAddedPromises.push(createAwardsDiariesForYearParentFunction(req, res, locations[i], financialYearString, currentFinancialYear));
      locationAddedPromises.push(generateTenderDataForLocation(req, res, locations[i]));
    }
  }
  
  try {
    await Promise.all(locationAddedPromises);
  } catch (error) {
    throw error;
  }
}

// Database Rebuild....
  // Admin Director can view previous years but cannot edit previous years.
  // Concerns: 
    // How is the data generated on ther frontend?
    // Will loading previous years use current data like locations, users, targets etc
    // Locations:
      // Could be an issue as the locations are used by the frontend when the data is being calculated
      // So if an old year is selected the awardsdiary totals will be generated using the current locations from the database???

  // Models that will require structre change:
    // 1 - awardsDiaries
    // 2 - targets
    // 3 - tenders
    // awardsdiariItems will not need changing as they are associated with a awardsDiary on creation (test)

  // Will need to generate this: const financialYear = '2324';
  // And add it everywhere its needed so:
    // 1 - add it to awardsDiary docs
    // 2 - Add it to target docs
    // 3 - Add it to tenders docs

  //   const awardsDiarySchema = new mongoose.Schema({
  //     year: {type: String, required: true},
  //     financialYear: {type: String, required: true}
  //     month: { type: String, required: true },
  //     location: { type: String, required: true },
  //     items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AwardsDiaryItem' }]
  // });

  // Will then use:
  // const awardsForLocation = await AwardsDiary.find({
  //   location, // Query for the specific location
  //   financialYear, // Query for the specific financial year
  // }).exec();
