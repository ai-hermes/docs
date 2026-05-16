import { NextResponse } from 'next/server';

const RELEASES_URL = 'https://github.com/ai-hermes/wechat-mem0-build/releases/latest/download/releases.json';

export async function GET() {
  try {
    const res = await fetch(RELEASES_URL, {
      next: { revalidate: 300 }, // cache 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch releases' },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch releases' },
      { status: 502 }
    );
  }
}
