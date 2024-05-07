
const Target = require('../models/Target');
const { getFinancialYearString } = require('../utils/DateUtils');

exports.addTarget = async (req, res) => {
  try {
    const { id } = req.body;
    const data = { ...req.body };
    data.financialYear = getFinancialYearString();

    console.log('data = ', data);

    if (id) {
      // If an ID is provided, update the existing target
      const updatedTarget = await Target.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTarget) {
        return res.status(404).json({ error: 'Target not found' });
      }
      return res.status(200).json(updatedTarget);
    } else {
      // If no ID is provided, create a new target
      const newTarget = new Target(data);

      await newTarget.save();
      return res.status(201).json(newTarget);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getTargets = async (req, res) => {
  const financialYear = req.query.year; // Retrieve financial year from query parameter

  try {
    let targets;

    if (financialYear) {
      // If a financial year is specified, filter by it
      targets = await Target.find({ financialYear }).exec();
    }

    res.status(200).send(targets); // Use status 200 for successful GET requests
  } catch (error) {
    console.error('Error getting targets:', error);
    res.status(500).json({ message: 'Internal server error' }); // Use status 500 for server errors
  }
}
