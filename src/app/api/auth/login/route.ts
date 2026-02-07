import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createSession, verifyCode } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Phone and code are required' },
        { status: 400 }
      );
    }

    // Verify the code
    const isValid = await verifyCode(phone, code);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          phone,
          nickname: `User${phone.slice(-4)}`,
        },
      });
    }

    // Create session
    const session = await createSession(user.id);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: session.expiresAt,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
