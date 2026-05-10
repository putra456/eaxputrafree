import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface UserData {
  username: string;
  password: string;
  role: string;
  premium: boolean;
}

function getUsers(): UserData[] {
  const filePath = path.join(process.cwd(), "src", "data", "users.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as UserData[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
        premium: user.premium,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
