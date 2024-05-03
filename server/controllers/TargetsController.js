
const Target = require('../models/Target');
const { getFinancialYearString } = require('../utils/DateUtils');

exports.addTarget = async (req, res) => {
  try {
    const { id } = req.body;
    const data = {...req.body};
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
  // TODO will need to amend this to get only the targets for the request financial year
  try {
    // Find all Locations records
    const targets = await Target.find().exec();

    res.status(201).send(targets);
  } catch (error) {
    res.status(400);
    console.log('Error getting targets: ', error);
  }
}
