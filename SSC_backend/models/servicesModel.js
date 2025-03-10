// creating a model

const mongoose =require('mongoose')

module.exports=mongoose.model('Services22',{
    title:String,
    description:String,
    imageUrl:String,
});