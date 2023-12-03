const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");

      req.userId = decoded._id;
      
      next();
    } catch (e) {
      return res.sendStatus(403).json({
        message: "Access not allowed",
      });
    }
  } else {
    return res.sendStatus(403).json({
      message: "Access not allowed",
    });
  }
  console.log(token);
};
