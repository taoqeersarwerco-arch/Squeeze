import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, project } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!project || typeof project !== 'string') {
      return NextResponse.json(
        { error: 'Project name is required.' },
        { status: 400 }
      );
    }

    // Generate a secure, deterministic or random developer sandbox API key
    const randomHex = crypto.randomBytes(16).toString('hex');
    const apiKey = `sqz_live_${randomHex}`;

    // In v1, this is an instantaneous free sandbox key provisioned for the developer
    return NextResponse.json({
      success: true,
      apiKey,
      tier: 'free',
      rateLimit: '100 requests / hour',
      message: 'API Key generated successfully. Keep this secret.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
