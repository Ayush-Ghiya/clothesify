// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgotpass from "../../models/Forgotpass"
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'
var CryptoJS = require("crypto-js");
export default async function handler(req, res) {

    if(req.body.sendMail){

    
    let token = `afadflkdhksdafhssdalfdfhsadlfqoruqewr`
    let forgot = new Forgotpass({
        email:req.body.email,
        token:token
    })
    let email=`
    Hi [name],
    
    There was a request to change your password!
    
    If you did not make this request then please ignore this email.
    
    Otherwise, please click this link to change your password: <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Reset Now</a>`
    res.status(200).json({ success:true })
}else{
    let user = await User.findOne({email:userdata.email})
}
  }
  