import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ connected: true });
  } catch (error) {
    return Response.json({ connected: false, error: error.message });
  }
}
