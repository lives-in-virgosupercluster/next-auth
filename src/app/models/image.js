import mongoose, { Schema } from "mongoose";



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