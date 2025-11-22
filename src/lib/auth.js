import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Generate JWT token
export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

// Verify JWT token
export function verifyToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Extract token from cookies
export function getTokenFromCookies(req) {
  const cookieHeader = req.headers?.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map(c => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    })
  );
  return cookies.token;
}
