import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid haiku" }, { status: 400 });
    }

    console.log(message);

    const haiku = await prisma.haiku.create({
      data: {
        content: message,
      },
    });

    return NextResponse.json({ success: true, haiku });
  } catch (err) {
    console.error("Error saving haiku:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Get haikus with pagination
    const haikus = await prisma.haiku.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    // Get total count for pagination
    const totalCount = await prisma.haiku.count();

    return NextResponse.json({
      haikus,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    console.error("Error fetching haikus:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
