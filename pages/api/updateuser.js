import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'
const handler = async (req, res) => {
  if (req.method == "POST") {
    let jwt= req.body.jwt
    let user = jsonwebtoken.verify(jwt,process.env.SECRET_KEY)
    
    let dbuser = await User.findOneAndUpdate({ email: user.email },{address:req.body.address,pincode:req.body.pincode,phone:req.body.phone,name:req.body.name});
    if (dbuser) {
      
        const{name,email,address,pincode,phone}=dbuser;
      res.status(200).json({success:true});
    } else {
      res.status(500).json({ success:false,error: "Error" });
    }
  } else {
    res.status(400).json({ success:false,error: "This is method is not allowed" });
  }
};

export default connectDb(handler);
