import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'http://static.rethinkai.spotty.com.cn';

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');

  if (!file || !/^[\w.\-]+$/.test(file)) {
    return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 });
  }

  const url = `${BASE_URL}/${file}`;

  // Server-side redirect to HTTP resource — browser treats this as a
  // same-origin navigation so mixed-content blocking does not apply.
  return NextResponse.redirect(url, 302);
}
