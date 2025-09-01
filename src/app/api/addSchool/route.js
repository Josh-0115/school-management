import { db } from "@/lib/db";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    let imagePath = "";

    // Save image to /public/schoolImages
    if (imageFile && typeof imageFile === "object") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(process.cwd(), "public/schoolImages", fileName);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/schoolImages/${fileName}`;
    }

    // Insert into DB
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
    );

    return NextResponse.json({ message: "School added successfully ✅" });
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { error: "Something went wrong ❌" },
      { status: 500 }
    );
  }
}
