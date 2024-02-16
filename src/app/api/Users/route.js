import User from "../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const username = body.username;
    const password=body.password;
  
    //Confirm data exists
    if (!username|| !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ name: username })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    

    await User.create({name:username,password:hashPassword,role:'user'});
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
