const { verifyToken } = require("../utils/JWTUtils")

exports.verifyToken = async (req, res) => {
  try {
    verifyToken(req, res, () => {
      res.status(200).json({message: "Token verification successful!", user: req.user});
    })

  } catch (error) {
      res.status(500).json({message: "There was an error with the token.", error})
  }
}