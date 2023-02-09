import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (
        req.body.email === user.email &&
        req.body.password ===
          CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(
            CryptoJS.enc.Utf8
          )
      ) {
        var token = jwt.sign({name: user.name, email: user.email },process.env.SECRET_KEY,{expiresIn:"2d"});
        res
          .status(200)
          .json({token,email:user.email,status:true});
      } else {
        res.status(400).json({ status: false, error: "Invalid Credential" });
      }
    } else {
      res.status(400).json({ status: false, error: "User not found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
