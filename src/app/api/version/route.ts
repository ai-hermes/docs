import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    buildTime: process.env.BUILD_TIME,
  });
}
