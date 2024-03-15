const AwardsDiary = require('../models/AwardsDiary');

const locations = [
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
  "Awe",
];

const months = [
  'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];


// TODO
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



exports.createAwardsDiariesForYear = async (req, res) => {
  console.log('create all for year called + data: ', req.body.location);

  const promises = [];
  const data = []; // for storing the AwardsDiary instances

  let counter = 0;

  try {
    months.forEach(async (month) => {
      data.push(new AwardsDiary({
        location: req.body.location,
        year: counter < 3 ? 2023 : 2024,
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

    console.log('data added = ', data);
  } catch (error) {
    console.log('Error generatng data for location. Error: ', error);
  }
}

// Return all record for current year based on location
exports.getAwardsForLocation = async (req, res) => {

  // need to get the location from the query param

  const {location} = req.query;

  try {
    console.log('get location data called');
    const awardsForLocation = await AwardsDiary.find({location}).exec();
    res.status(201).send(awardsForLocation);
  } catch (error) {
    res.status(400);
    console.log('Error getting all records for location: ', error);
  }
}

// TODO
exports.getAllAwardsDiary = async (req, res) => {
  console.log('CALLED');
  try {
    const awardsDiaryEntries = await AwardsDiary.find();
    res.send(awardsDiaryEntries);
  } catch (error) {
    res.status(500).send(error);
  }
};


function buildData(location) {
  months.forEach((month) => {

  })
}