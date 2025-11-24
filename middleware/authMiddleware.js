const { API_AUTH_KEY } = require('./authkey');

const authMiddleware = (req, res, next) => {
  const authKey = req.headers.apiauthkey;

  if (!authKey) {
    return res.status(401).json({
      message: "Access denied, apiauthkey is missing"
    });
  }

  if (authKey !== API_AUTH_KEY) {
    return res.status(401).json({
      message: "Failed to authenticate apiauthkey"
    });
  }

  next();
};

module.exports = { authMiddleware };
