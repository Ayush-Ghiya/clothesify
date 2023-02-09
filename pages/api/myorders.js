import OrderB from "../../models/OrderB";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'


const handler = async (req, res) => {
    const token = JSON.parse(req.body.token)
  
    // const data = jsonwebtoken.verify(token,process.env.SECRET_KEY)
  let orders = await OrderB.find({email:token.email});
  if(orders){

    res.status(200).json({ orders });
  }else{
    res.status(500).json({error:"Error"})
  }
};

export default connectDb(handler);
