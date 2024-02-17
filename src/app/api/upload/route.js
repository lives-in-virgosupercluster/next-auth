import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import Image from "../../models/image";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const username = formData.get("user");

  console.log(file);
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const filePath = path.join("public/uploads", filename); // Relative path to the uploaded file

  try {
    await writeFile(path.join(process.cwd(), filePath), buffer);

    // Save the image details to MongoDB
    const image = new Image({
      username,
      name: file.name,
      filename,
      path: filePath,
    });

    await image.save();

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};