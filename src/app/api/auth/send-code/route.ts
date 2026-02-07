import { NextRequest, NextResponse } from 'next/server';
import { createVerificationCode } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Basic phone validation (can be enhanced for international formats)
    const phoneRegex = /^[\d\+\-\s]{8,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    await createVerificationCode(phone);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send code error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
