import createConnection from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql ="SELECT * FROM transactions";
    const [posts] = await db.query(sql);

    return NextResponse.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching transactions:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }else {
      console.error("Unknown error", error);
    }
  }
}

export async function POST(req: Request) {
  try {
    const db = await createConnection();
    const { title, amount, category_id, type, date } = await req.json();

    if (!title || !amount || !type || !date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const sql = `INSERT INTO transactions (title, amount, category_id, type, date) VALUES (?, ?, ?, ?, ?)`;
    const values = [title, amount, category_id, type, date];

    await db.query(sql, values);

    return NextResponse.json({
      title,
      amount,
      category_id,
      type,
      date
    }, { status: 201 });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching transactions:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }else {
      console.error("Unknown error", error);
    }
  }
}
