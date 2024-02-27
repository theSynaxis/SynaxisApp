import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { destroySessions } from "~/server/api/cron";

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  await destroySessions();

  return NextResponse.json({ success: true });
}

