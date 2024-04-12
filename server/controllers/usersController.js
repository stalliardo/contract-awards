
const User = require('../models/User');
const Location = require('../models/Location');

exports.getUsers = async (req, res) => {
  try {
    // Find all Locations records
    const users = await User.find().exec();

    res.status(201).send(users);
  } catch (error) {
    res.status(400);
    console.log('Error getting users: ', error);
  }
}

exports.addLocationToUser = async (req, res) => {
  const { userId, location } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { locations: location } }, // Use $addToSet to add the location if it's not already present
      { new: true } // Return the updated document after the update
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser); // Send the updated user document in the response
  } catch (error) {
    console.error('Error adding location to user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.addAllLocationsToUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get all locations from the database
    const locations = await Location.find().exec();

    if (!locations || locations.length === 0) {
      return res.status(404).json({ error: 'Locations not found' });
    }

     // Extract the names of the locations
     const locationNames = locations.map(location => location.name);

    // Update the user document to add all locations
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { locations: { $each: locationNames } } }, // Use $push to add all locations
      { new: true } // Return the updated document after the update
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser); // Send the updated user document in the response
  } catch (error) {
    console.error('Error adding locations to user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeLocationFromUser = async (req, res) => {
  try {
    const { userId, location } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { locations: location } }, { new: true });
    res.status(200).json({ message: "Location successfully removed", user: updatedUser });

  } catch (error) {
    console.log('An error occured while removing the location from the user. Error: ', error);
    res.status(500);
  }
}
