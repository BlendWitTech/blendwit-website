import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Called by the CMS backend when content is updated (Settings → Clear Theme Cache)
// Set REVALIDATE_SECRET in both this theme's env and the CMS backend env to secure it.
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const incoming = req.headers.get('x-revalidate-secret');
    if (incoming !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true });
}
