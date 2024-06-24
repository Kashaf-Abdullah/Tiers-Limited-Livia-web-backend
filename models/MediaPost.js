const mongoose =require('mongoose')
const Schema=mongoose.Schema;

const mediaSchema=new Schema({
    heading:{
        type:String,
        required:true,
        
    },
  
    description : {
        type : String,
        required : true
    },
   
  
    link:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        // required:true
    },

})

const Media=mongoose.model('User',mediaSchema)
module.exports=Media