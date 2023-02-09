import OrderB from "../../models/OrderB";
import connectDb from "../../middleware/mongoose";
import ProductDetails from "../../models/ProductDetails";
import pincodes from '../../pincodes.json'
const handler = async (req, res) => {
  if(!Object.keys(pincodes).includes(req.body.pincode)){
    res.status(400).json({ success:false, error: "Your pincode is not serviceable at the moment" });
    return
  }
  let product,
    sumTotal = 0;
    const fetcher = async(item)=>{
      product = await ProductDetails.findOne({ slug: item });
   }
    if(req.body.subTotal<=0){
      res.status(400).json({ success:false, error: "Cart Empty! Please build your cart and try again" });

      setTimeout(() => {
        res.redirect('/')
      }, 2000);
    }
  for (let item in req.body.cart) {
    
    sumTotal += req.body.cart[item].price * req.body.cart[item].qty;
    
    await fetcher(item);
    if(product.availableQty < req.body.cart[item].qty){
      res.status(400).json({success:false, error: "Some items in your cart went out of stock please try again" });
    }
    else if (product.price != req.body.cart[item].price) {
      res.status(400).json({success:false, error: "item price has been changed" });
      return
    }else{
      await ProductDetails.findOneAndUpdate({ slug: item },{$inc:{"availableQty": -req.body.cart[item].qty}})
    }
  }
  if (sumTotal != req.body.subTotal) {
    res.status(400).json({ success:false, error: "total has been changed" });
    return
  }
  if(req.body.phone.length != 10 || !Number.isInteger(Number(req.body.phone))){
    res.status(400).json({ success:false, error: "Please enter correct phone number" });
    return

  }
  if(req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))){
    res.status(200).json({ success:false, error: "Please enter correct pincode" });
    return

  }
  if (req.method == "POST") {
    let order = new OrderB({
      email: req.body.email,
      address: `${req.body.address},${req.body.city},${req.body.state},${req.body.pincode}`,
      amount: req.body.subTotal,
      products: req.body.cart,
      orderid: req.body.orderids,
      phone: req.body.phone,
      name: req.body.name,
    });
    
    await order.save();
    res.status(200).json({ success: true});
  } else {
    res.status(400).json({ success: true,error: "This method is not allowed" });
  }
};

export default connectDb(handler);
