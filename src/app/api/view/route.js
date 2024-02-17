// C:\Users\Harsh singh\OneDrive\Desktop\Next-auth-app\next-auth\src\app\api\view\route.js

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Image from "../../models/image";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

export const GET = async (req, res) => {
   // console.log(req);
 // const { username } = req.query;
  const url = new URL(req.url)
const searchParams = new URLSearchParams(url.search)
const username = searchParams.get('username');


  try {
    // Find all images for the given username
    const userImages = await Image.find({ username });

    // Extract the file paths from the retrieved images
    const filePaths = userImages.map((image) => image.filename);
    console.log(filePaths);


    return NextResponse.json({ user: username, images: filePaths }, { status: 200 });
  } catch (error) {
    console.error("Error occurred while retrieving user images", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
