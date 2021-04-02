const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  date: String,
  message: String,
  uid: Number
});

module.exports = mongoose.model('Comment', CommentSchema);
