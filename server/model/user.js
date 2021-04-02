const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  initial: String,
  name: String,
  uid: Number
});

module.exports = mongoose.model('User', UserSchema);
