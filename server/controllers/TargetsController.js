
const Target = require('../models/Target');

exports.addTarget = async (req, res) => {
  try {
    const newTarget = new Target(req.body);
    await newTarget.save();
    res.status(201).send(newTarget);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getTargets = async (req, res) => {
    try {
      // Find all Locations records
      const targets = await Target.find().exec();
  
      res.status(201).send(targets);
    } catch (error) {
      res.status(400);
      console.log('Error getting targets: ', error);
    }
  }
