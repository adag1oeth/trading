import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { rateLimit } from "@/lib/rate-limit";

// Create limiter: 5 attempts per 5 minutes
const limiter = rateLimit({ interval: 5 * 60 * 1000 });

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Token verification flow
    if (body.token) {
      try {
        if (!process.env["JWT_SECRET"]) {
          throw new Error("Missing JWT_SECRET");
        }
        jwt.verify(body.token, process.env["JWT_SECRET"]);
        return NextResponse.json({ valid: true });
      } catch {
        return NextResponse.json({ valid: false });
      }
    }

    // Existing login flow
    const { password } = body;
    const ip = req.headers.get("x-forwarded-for") || "anonymous";

    // Check rate limit
    try {
      await limiter.check(5, ip);
    } catch {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    if (!process.env["JWT_SECRET"] || !process.env["CHAT_PASSWORD"]) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password !== process.env["CHAT_PASSWORD"]) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        authorized: true,
        issuedAt: Date.now(),
      },
      process.env["JWT_SECRET"],
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
