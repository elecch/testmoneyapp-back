const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "접근권한이 없습니다." });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) {
      return res.status(401).send({ message: "접근권한이 없습니다." });
    }
    req._id = data._id;
    next();
  });
};
