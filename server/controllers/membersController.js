
const Member = require('../models/Member');

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

// exports.getMembers = async (req, res) => {
//     try {
//       // Find all Locations records
//       const locations = await Location.find().exec();
  
//       res.status(201).send(locations);
//     } catch (error) {
//       res.status(400);
//       console.log('Error getting locations: ', error);
//     }
//   }
