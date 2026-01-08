import { NextResponse } from 'next/server';
import { generateMockDeveloperProfiles, generateAutoSummary } from '@/lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const developerId = searchParams.get('developerId');
    
    if (!developerId) {
      return NextResponse.json({ error: 'developerId is required' }, { status: 400 });
    }
    
    const profiles = generateMockDeveloperProfiles();
    const profile = profiles.find(p => p.id === developerId);
    
    if (!profile) {
      return NextResponse.json({ error: 'Developer not found' }, { status: 404 });
    }
    
    const summary = generateAutoSummary(profile);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
