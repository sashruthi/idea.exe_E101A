import { NextResponse } from 'next/server';
import { generateTimelineEntries } from '@/lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const developerId = searchParams.get('developerId') || 'dev-0';
    const days = parseInt(searchParams.get('days') || '90');
    
    const entries = generateTimelineEntries(developerId, days);
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}
