import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {
    let jwt= req.body.jwt
    let userdata = jsonwebtoken.verify(jwt,process.env.SECRET_KEY)
   let user = await User.findOne({email:userdata.email})
   const decryptedpass =CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)


   if(req.body.password === req.body.cpassword){
    if(decryptedpass===req.body.currentpassword){

        let dbuser = await User.findOneAndUpdate({ email: userdata.email },{password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()});
        if (dbuser) {
          
          res.status(200).json({success:true});
        } else {
          res.status(500).json({ success:false,error: "Error" });
         }
     }else{
        res.status(500).json({ success:false,error: "Current password is incorrect" });
        
    }
}else{
       res.status(500).json({ success:false,error: "Password and confirm password does not match" });

   }
   
  } else {
    res.status(400).json({ success:false,error: "This is method is not allowed" });
  }
};

export default connectDb(handler);
