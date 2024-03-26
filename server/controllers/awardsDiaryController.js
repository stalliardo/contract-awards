const AwardsDiary = require('../models/AwardsDiary');

const months = [
  'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const LOCATIONS = {
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
  NEWCASTLE: "Newcastle"
}


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
    await Promise.all(promises).then(() => {
      res.status(201).send({message: "Yearly records created successfully"})
    }).catch((error) => {
      res.status(500).send(error);
    })

    console.log('data added = ', data);
  } catch (error) {
    console.log('Error generatng data for location. Error: ', error);
  }
}



// Return all record for current year based on location
exports.getAwardsForLocation = async (req, res) => {
  const {location} = req.query;

  try {
    // Find all AwardsDiary records for the given location
    const awardsForLocation = await AwardsDiary.find({location}).exec();

    // Populate the 'items' field for each AwardsDiary record
    await AwardsDiary.populate(awardsForLocation, { path: 'items' });

    res.status(201).send(awardsForLocation);
  } catch (error) {
    res.status(400);
    console.log('Error getting all records for location: ', error);
  }
}

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
