import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { connectDB } from "../../../lib/db";
import { createToken } from "../../../lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const user = await User.findOne({ username });
    if (!user) return new Response(JSON.stringify({ error: "Invalid username" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });

    const token = createToken({ id: user._id, username: user.username });

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);
    headers.append("Content-Type", "application/json");

    return new Response(JSON.stringify({ message: "Login successful" }), { status: 200, headers });

  } catch (err) {
    console.error("Login API Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
