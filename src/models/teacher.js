const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
  userName: String,
  password: String
  // assignments: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "assigment"
  //   }
  // ]
});
module.exports = mongoose.model("teacher", teacherSchema);
