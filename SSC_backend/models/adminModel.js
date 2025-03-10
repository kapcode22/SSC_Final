// creating a model

const mongoose =require('mongoose')

const adminModel = mongoose.model('admin',{
     type:String,
     username:String,
     password:String,
     status:String,
     date:String,
});

module.exports=adminModel
// adminModel.create({
//     type:'ADMIN',
//     username:'admin-default',
//     password:'pass123',
//     status:'ACTIVE',
//     date: new Date(),
// })