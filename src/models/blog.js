const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  dateOfPublish: {
    type: Date,
    default: Date.now,
    required: true
  },
  category:{
  type:String
  },
  duration: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  imagesId: {
    type: Schema.Types.ObjectId,
    ref: "image"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("blog", BlogSchema);
