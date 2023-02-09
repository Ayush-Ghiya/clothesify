import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
  if (req.method == "POST") {
    const {name,email} = req.body;
    const u = new User({name,email,password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()});
    await u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
