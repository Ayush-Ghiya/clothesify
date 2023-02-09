import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'
const handler = async (req, res) => {
  if (req.method == "POST") {
    let jwt= req.body.jwt
    let user = jsonwebtoken.verify(jwt,process.env.SECRET_KEY)
    
    let dbuser = await User.findOne({ email: user.email });
    if (dbuser) {
      
        const{name,email,address,pincode,phone}=dbuser;
      res.status(200).json({name,email,address,pincode,phone});
    } else {
      res.status(500).json({ error: "Error" });
    }
  } else {
    res.status(400).json({ error: "This is method is not allowed" });
  }
};

export default connectDb(handler);
