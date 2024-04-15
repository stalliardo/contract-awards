const { verifyToken } = require("../utils/JWTUtils")


exports.protectedRoute = async (req, res) => {
  console.log('protected route called');
  try {
    verifyToken(req, res, () => {
      
      // verified code goes Headers.apply.apply.

      res.json("The verification was successful");

    })

  } catch (error) {
      res.status(500).json({message: "There was an error with the token.", error})
  }
}


// Journey: 
  // User auths successfully against the backend
  // A jwt token is generated and sent to the backend
  // The token is stored on the users browser
  // Any sensitive request is sent along with the token