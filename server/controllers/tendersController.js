const Tender = require("../models/Tenders");
const Location = require("../models/Location");
const { getFinancialYearString } = require("../utils/DateUtils");
const { canUserPerformAuthenticatedAction } = require("../utils/JWTUtils");


const months = [
  'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

exports.getTenders = async (req, res) => {
  const financialYear = req.query.year;

  try {
    const tenders = await Tender.find({ financialYear }).exec();

    if (!tenders || tenders.length === 0) {
      return res.status(404).json({ message: "No tenders found" });
    }

    return res.status(200).json(tenders);
  } catch (error) {
    res.status(500).json({ message: "There was an error generating tenders data.", error })
  }
}

exports.putTender = async (req, res) => {
  try {
    const { _id, month, newValue } = req.body;
    const tender = await Tender.findById(_id);
    const item = tender.items.find(item => item.month === month);

    if (item) {
      item.value = newValue;

      // Save the updated document
      await tender.save();

      return res.status(201).json({ message: "Item updated successfully" });
    } else {
      return { success: false, message: "Item not found for the specified month" };
    }
  } catch (error) {
    res.status(500).json({ message: "There was an error generating tenders data.", error })
  }
}

exports.generateDataForNewLocation = async (req, res) => {
  try {
    const { location } = req.body;
    const financialYearString = getFinancialYearString();

    if (!location) {
      return res.status(404).json({ message: "No location provided" })
    }

    const data = { location, financialYear: financialYearString, items: [] };

    months.forEach((month) => {
      data.items.push({ month, value: 0 })
    })

    const newTender = new Tender(data);
    newTender.save();

  } catch (error) {
    res.status(500).json({ message: "There was an error generating tenders data.", error })
  }
}

exports.generateInitialData = async (req, res) => {
  try {
    const { user } = req;

    const actionPermitted = canUserPerformAuthenticatedAction(user.username);

    if (actionPermitted) {
      const locations = await Location.find().exec();
      const promises = [];

      if (!locations || locations.length === 0) {
        return res.status(404).json({ message: "No locations found" })
      }

      const financialYearString = getFinancialYearString();

      locations.forEach((location) => {
        const data = { location: location.name, financialYear: financialYearString, items: [] };

        months.forEach((month) => {
          data.items.push({ month, value: 0 })
        })

        const newTender = new Tender(data);

        promises.push(newTender.save());
      })

      await Promise.all(promises).then(() => {
        res.status(201).json({ message: "All tenders added successfully" });
      })

    } else {
      return res.status(400).json({ error: "This user is not allowed to call this function" })
    }
  } catch (error) {
    res.status(500).json({ message: "There was an error generating tenders data.", error })
  }
}

exports.generateTenderDataForLocation = async (req, res, location) => {
  try {
    const promises = [];
    const financialYearString = getFinancialYearString();
    const data = { location: location, financialYear: financialYearString, items: [] };

    months.forEach((month) => {
      data.items.push({ month, value: 0 })
    })
    const newTender = new Tender(data);
    promises.push(newTender.save());

    await Promise.all(promises);

  } catch (error) {
    console.log('error generating tender data = ', error);
    throw error;
  }
}