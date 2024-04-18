const Tender = require("../models/Tenders");
const Location = require("../models/Location");

const months = [
  'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

// This function is only to be ran once. This will loop all the locations in the datbase and generate default values for each location and each month
// SITE ADMIN ONLY
exports.generateInitialData = async (req, res) => {
  try {
    const locations = await Location.find().exec();
    const promises = [];

    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "No locations found" })
    }

    locations.forEach((location) => {
      const data = { location: location.name, items: [] };
      months.forEach((month) => {
        data.items.push({ month, value: 0 })
      })

      const newTender = new Tender(data);

      promises.push(newTender.save());
    })

    await Promise.all(promises);
  } catch (error) {
    res.status(500).json({ message: "There was an error generating tenders data.", error })
  }
}

exports.generateDataForNewLocation = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(404).json({ message: "No location provided" })
    }

    const data = { location, items: [] };

    months.forEach((month) => {
      data.items.push({ month, value: 0 })
    })

    const newTender = new Tender(data);
    newTender.save();

  } catch (error) {
    res.status(500).json({ message: "There was an error generating tenders data.", error })
  }
}