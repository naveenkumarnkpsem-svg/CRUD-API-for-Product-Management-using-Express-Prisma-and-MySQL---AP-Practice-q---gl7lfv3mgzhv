const express = require("express")

 const authMiddleware = async (req, res, next) => {
  const apiauthkey = req.headers['apiauthkey'];

  

  if (!apiauthkey) {
    return res.status(401).json({ 
   "error": "apiauthkey is missing or invalid"
});
  }
  if(apiauthkey!==process.env.API_AUTH_KEY){
    return res.status(401).json({ 
   
  "error": "Failed to authenticate apiauthkey"

});
  }
  next();
}

module.exports={authMiddleware}
