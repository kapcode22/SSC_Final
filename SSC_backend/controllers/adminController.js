///variabke to save service model
const adminModel=require('../models/adminModel')
const jwt =require('jsonwebtoken')
// if you want to display it on frontend first you have to get it from backend 
// using getservices controller
module.exports.getAdmins=async(req,res)=>{
    // we can find title email, desc, any thing  u want 
    // if u pass it as empty it will return all object in table
    const _data=await adminModel.find({})
    if(_data){
        return res.send({code:200,message:'success',data:_data})
    }
    else{
        return res.send({code:500,message:'service error'})
    }
}

module.exports.addAdmins=async(req,res)=>{
    const {username, type, password, date, status}=req.body;

    const _res=await adminModel.create({username, type, password, date, status})
    if(_res){
        return res.send({code:200,message:'success',})
    }
    else{
        return res.send({code:500,message:'service error'})
    }
}

module.exports.loginAdmin=async(req,res)=>{
    const {username,password}=req.body;

    const userExists=await adminModel.findOne({username: username})
    if(userExists){
        if(userExists.password!==password){
            return res.send({code:400,message:'Wrong userName or Password',})
        }
        const _token=jwt.sign({...userExists},'SSC_123');
        return res.send({
            code:200,
            messag:'Login Successful',
            token:_token,
            type:userExists.type
        })
    }  
    else{
        return res.send({code:500,message:'service error'})
    }
}

module.exports.getsingleAdmin = async (req, res) => {
    try {
      const { id } = req.params; // Get admin ID from request parameters
      const admin = await adminModel.findById(id); // Find admin by ID
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  module.exports.logout= async(req,res)=>{
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
  };