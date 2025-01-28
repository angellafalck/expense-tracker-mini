import createConnection from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql ="SELECT * FROM categories";
    const [posts] = await db.query(sql);

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
