const mongoose = require('mongoose'),
const Schema = mongoose.Schema
const studentSchema = new Schema({
  userName:{type:String},
  password:{type:String},
 // attempted:[{type:mongoose.Types.ObjectId,ref:'assignment'}]
})
module.exports = mongoose.model('student',studentSchema)