import {
  Developer,
  DeveloperProfile,
  TimelineEntry,
  ContributionSnapshot,
  AutoSummary,
} from '@/types';

const names = [
  'Alex Chen', 'Sam Rodriguez', 'Jordan Kim', 'Morgan Taylor',
  'Casey Wong', 'Riley Patel', 'Drew Martinez', 'Jamie Lee',
  'Taylor Brown', 'Blake Davis', 'Cameron Wilson', 'Quinn Anderson'
];

const roles = ['Senior Engineer', 'Staff Engineer', 'Principal Engineer', 'Engineer', 'Lead Engineer'];
const teams = ['Platform', 'Product', 'Infrastructure', 'Security', 'Data'];

function generateMockDeveloper(id: string, index: number): Developer {
  const name = names[index % names.length];
  return {
    id,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
    role: roles[index % roles.length],
    githubUsername: `github-${name.toLowerCase().replace(' ', '-')}`,
    slackUsername: `@${name.toLowerCase().replace(' ', '.')}`,
    team: teams[index % teams.length],
    joinedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  };
}

function calculateBiasGap(impactRank: number, activityRank: number): number {
  return activityRank - impactRank; // Positive = underappreciated, Negative = overrated by activity
}

export function generateMockDeveloperProfiles(count: number = 12): DeveloperProfile[] {
  const profiles: DeveloperProfile[] = [];
  
  for (let i = 0; i < count; i++) {
    const developer = generateMockDeveloper(`dev-${i}`, i);
    
    // Create varied profiles: some high-impact/low-activity (Silent Architects)
    // Some high-activity/low-impact, and balanced ones
    const isSilentArchitect = i % 3 === 0; // Every 3rd developer is a Silent Architect
    
    const impactScore = isSilentArchitect 
      ? 75 + Math.random() * 20 // High impact
      : 40 + Math.random() * 50;
      
    const activityScore = isSilentArchitect
      ? 30 + Math.random() * 30 // Low activity
      : 40 + Math.random() * 50;
    
    const collaborationScore = 50 + Math.random() * 40;
    const overallScore = (impactScore * 0.5 + activityScore * 0.2 + collaborationScore * 0.3);
    
    const profile: DeveloperProfile = {
      ...developer,
      metrics: {
        impactScore: Math.round(impactScore),
        activityScore: Math.round(activityScore),
        collaborationScore: Math.round(collaborationScore),
        overallScore: Math.round(overallScore),
      },
      impactMetrics: {
        mergedPRs: isSilentArchitect ? 25 + Math.floor(Math.random() * 15) : 10 + Math.floor(Math.random() * 20),
        criticalBugFixes: isSilentArchitect ? 8 + Math.floor(Math.random() * 7) : 2 + Math.floor(Math.random() * 8),
        reviewDepth: 3 + Math.random() * 4,
        complexModuleWork: isSilentArchitect ? 15 + Math.floor(Math.random() * 10) : 5 + Math.floor(Math.random() * 12),
        componentOwnership: isSilentArchitect ? ['Core Engine', 'API Gateway'] : ['Component A'],
      },
      activityMetrics: {
        messageCount: isSilentArchitect ? 50 + Math.floor(Math.random() * 50) : 200 + Math.floor(Math.random() * 300),
        mentionsReceived: isSilentArchitect ? 5 + Math.floor(Math.random() * 10) : 30 + Math.floor(Math.random() * 50),
        reactionsReceived: isSilentArchitect ? 10 + Math.floor(Math.random() * 15) : 50 + Math.floor(Math.random() * 100),
        meetingParticipation: isSilentArchitect ? 40 + Math.floor(Math.random() * 20) : 70 + Math.floor(Math.random() * 30),
        collaborationReach: 5 + Math.floor(Math.random() * 10),
      },
      collaborationMetrics: {
        prsReviewed: 20 + Math.floor(Math.random() * 30),
        helpfulReviews: 15 + Math.floor(Math.random() * 25),
        issueDiscussions: 10 + Math.floor(Math.random() * 20),
        mentoringActions: 5 + Math.floor(Math.random() * 15),
      },
      workTypeBreakdown: {
        featureDevelopment: 40 + Math.random() * 30,
        bugFixes: 15 + Math.random() * 20,
        peerReview: 20 + Math.random() * 25,
        refactoring: 10 + Math.random() * 15,
        documentation: 5 + Math.random() * 10,
      },
      isSilentArchitect,
      impactRank: 0, // Will be calculated
      activityRank: 0, // Will be calculated
      biasGap: 0, // Will be calculated
    };
    
    profiles.push(profile);
  }
  
  // Calculate ranks
  profiles.sort((a, b) => b.metrics.impactScore - a.metrics.impactScore);
  profiles.forEach((p, idx) => p.impactRank = idx + 1);
  
  profiles.sort((a, b) => b.metrics.activityScore - a.metrics.activityScore);
  profiles.forEach((p, idx) => p.activityRank = idx + 1);
  
  // Calculate bias gap
  profiles.forEach(p => p.biasGap = calculateBiasGap(p.impactRank, p.activityRank));
  
  return profiles;
}

export function generateTimelineEntries(developerId: string, days: number = 90): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  const types: Array<'pr' | 'review' | 'bugfix' | 'discussion' | 'mentoring'> = ['pr', 'review', 'bugfix', 'discussion', 'mentoring'];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Generate 0-3 entries per day
    const entriesCount = Math.floor(Math.random() * 4);
    for (let j = 0; j < entriesCount; j++) {
      const type = types[Math.floor(Math.random() * types.length)];
      entries.push({
        date: new Date(date.getTime() + j * 3600000), // Spread throughout the day
        developerId,
        type,
        description: `${type} activity`,
        impact: Math.random() * 100,
      });
    }
  }
  
  return entries.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function generateAutoSummary(profile: DeveloperProfile): AutoSummary {
  const achievements: string[] = [];
  const recommendations: string[] = [];
  
  if (profile.metrics.impactScore > 70) {
    achievements.push(`High impact score of ${profile.metrics.impactScore} indicates substantial value delivery`);
  }
  
  if (profile.impactMetrics.criticalBugFixes > 5) {
    achievements.push(`Resolved ${profile.impactMetrics.criticalBugFixes} critical bug fixes, preventing production issues`);
  }
  
  if (profile.collaborationMetrics.helpfulReviews > 20) {
    achievements.push(`Provided ${profile.collaborationMetrics.helpfulReviews} high-quality code reviews`);
  }
  
  if (profile.isSilentArchitect) {
    achievements.push(`Silent Architect: High impact with measured communication style`);
    recommendations.push('Consider recognizing this developer publicly for their substantial behind-the-scenes contributions');
  }
  
  if (profile.metrics.activityScore < 40 && profile.metrics.impactScore > 60) {
    recommendations.push('High impact but low visibility - consider increasing recognition and opportunities for leadership');
  }
  
  if (profile.biasGap > 5) {
    recommendations.push(`Significant bias gap detected (ranked #${profile.activityRank} by activity, #${profile.impactRank} by impact) - consider addressing visibility`);
  }
  
  const summary = `${profile.name} has demonstrated ${profile.isSilentArchitect ? 'exceptional' : 'solid'} contributions with an overall score of ${profile.metrics.overallScore}. ` +
    `Impact score of ${profile.metrics.impactScore} is ${profile.metrics.impactScore > 70 ? 'exceptional' : profile.metrics.impactScore > 50 ? 'strong' : 'moderate'}. ` +
    `Activity metrics show ${profile.metrics.activityScore > 60 ? 'high' : profile.metrics.activityScore > 40 ? 'moderate' : 'measured'} communication levels.`;
  
  return {
    developerId: profile.id,
    summary,
    keyAchievements: achievements.length > 0 ? achievements : ['Consistent contributor to team goals'],
    recommendations: recommendations.length > 0 ? recommendations : ['Continue current trajectory'],
  };
}
