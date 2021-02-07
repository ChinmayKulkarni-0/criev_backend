const mangoose = require('mongoose');
const { use } = require('../routes/auth');

const userSchema = new mangoose.Schema({
   name:{
       type: String,
       require:true,
       min:6
   },
   email:{
       type:String,
       require:true,
       max:200,
       min:6
   },
   password:{
       type:String,
       require:true,
       max:100,
       min:6
   },
   date:{
       type:Date,
       default: Date.now
   }

});
module.exports = mangoose.model('User',userSchema);