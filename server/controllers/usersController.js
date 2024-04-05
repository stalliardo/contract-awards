
const User = require('../models/User');

// TODO

// exports.addMember = async (req, res) => {
//   try {
//     const newLocation = new Location(req.body);
//     await newLocation.save();
//     res.status(201).send(newLocation);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

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

exports.removeLocationFromUser = async (req, res) => {
  try {
    // Assume userId is the ID of the user document you want to update

    const { userId, location } = req.body;

    console.log('userId = ', userId);
    console.log('location = ', location);

    // Update the user document to remove the specified location from the locations array
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { locations: location } }, { new: true });
    res.status(204).send({ message: "Location successfully removed" });
  } catch (error) {
    console.log('An error occured while removing the location from the user. Error: ', error);
    res.status(500);
  }
}
