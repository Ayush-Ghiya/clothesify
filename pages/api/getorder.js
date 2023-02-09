import OrderB from "../../models/OrderB";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let order = await OrderB.findOneAndUpdate({orderid:req.body},{status:'Paid'});
  if(order){

    res.status(200).json({ order });
  }else{
    res.status(500).json({error:"Error"})
  }
};

export default connectDb(handler);
