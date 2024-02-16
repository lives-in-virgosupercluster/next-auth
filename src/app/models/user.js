import mongoose, { Schema } from "mongoose";
console.log("here again",process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      required: true
    }
  
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;