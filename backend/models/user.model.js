// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const bcrypt=require("bcrypt")

// const userSchema = new Schema({
//   fullName: { type: String },
//   email: { type: String },
//   password: { type: String },
//   createdOn: { type: Date, default: new Date().getTime() },
// });



// userSchema.pre('save',async function(next){
//   const salt=await bcrypt.genSalt()
//   this.password=await bcrypt.hash(this.password,salt)
//   next()
// })

// module.exports = mongoose.model("User", userSchema);



const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");  // <-- Import validator

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,   // <-- Email validation
      message: "Please enter a valid email",
    },
  },
  password: { type: String, required: true},
  createdOn: { type: Date, default: () => new Date().getTime() },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
