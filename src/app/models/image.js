import mongoose, { Schema } from "mongoose";
// console.log("here again",process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.Promise = global.Promise;

const imageSchema = new Schema(
  {
    Imagename: {
        type: String,
        required:true,
       
      },
    
      Imagedata: {
        type: Buffer,
        required:true,
       
      },
      contentType: {
        type: String,
       
      },
    
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;