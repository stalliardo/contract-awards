
const Location = require('../models/Location');

exports.addLocation = async (req, res) => {
  try {
    
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).send(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
