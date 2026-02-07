import { cookies } from 'next/headers';
import { prisma } from './prisma';

const SESSION_COOKIE_NAME = 'session_token';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function createSession(userId: string) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

export async function deleteSession(token: string) {
  await prisma.session.delete({
    where: { token },
  });
}

export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function generateVerificationCode(): string {
  // For development/testing, always return 123456
  if (process.env.NODE_ENV === 'development') {
    return '123456';
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createVerificationCode(phone: string) {
  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await prisma.verificationCode.create({
    data: {
      phone,
      code,
      expiresAt,
    },
  });

  // TODO: Send SMS via provider (Aliyun, Twilio, etc.)
  // For now, just log it in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] Verification code for ${phone}: ${code}`);
  }

  return code;
}

export async function verifyCode(phone: string, code: string) {
  const verification = await prisma.verificationCode.findFirst({
    where: {
      phone,
      code,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!verification) {
    return false;
  }

  // Mark as used
  await prisma.verificationCode.update({
    where: { id: verification.id },
    data: { used: true },
  });

  return true;
}
