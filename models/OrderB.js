const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  orderid:{type:String,required:true,unique: true},
  email: { type: String, required: true },
  products: {type: Object, required:true},
  address: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending", required: true },
},{timestamps:true});


export default mongoose.models.OrderB || mongoose.model("OrderB", OrderSchema);

