import ProductDetails from "../../models/ProductDetails";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await ProductDetails.find();
  
  res.status(200).json({ products });
};

export default connectDb(handler);
