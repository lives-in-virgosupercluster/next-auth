import Image from "../../models/image";
import { NextResponse } from "next/server";
export async function  POST (req, res) {
  

    const body = await req.json();

  try {
   
    // Replace 'images' with your actual collection name
    
    const result = await Image.deleteOne({filename:body.imageUrl});
    console.log(result);

  

   

    return NextResponse.json({ message: 'Image deleted successfully' },{status:200});
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ message: 'Internal Server Error' },{status:500});
  }
}