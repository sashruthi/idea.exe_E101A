import { NextResponse } from 'next/server';
import { generateMockDeveloperProfiles } from '@/lib/mockData';

export async function GET() {
  try {
    const profiles = generateMockDeveloperProfiles(12);
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch developers' }, { status: 500 });
  }
}
