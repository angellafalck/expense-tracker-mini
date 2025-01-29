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


export async function POST(req: Request) {
  try {
    const db = await createConnection();
    const { name, budget } = await req.json();

    if (!name || !budget) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const sql = `INSERT INTO categories (name, budget) VALUES (?, ?)`;
    const values = [name, budget];

    const [result] = await db.query(sql, values);

    return NextResponse.json({
      id: result.insertId,
      name,
      budget,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error adding category:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
