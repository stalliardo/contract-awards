
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
