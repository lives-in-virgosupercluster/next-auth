import mongoose, { Schema } from "mongoose";
// console.log("here again",process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.Promise = global.Promise;

const imageSchema = new Schema(
  {
    username:String,
  name:String,
  filename:String,
    
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;