const jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.secret);
    req.userData = {
      id: decodedToken.id
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!"
    });
  }
};