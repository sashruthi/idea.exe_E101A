export interface Developer {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  githubUsername: string;
  slackUsername: string;
  team: string;
  joinedAt: Date;
}

export interface ContributionMetrics {
  impactScore: number; // 0-100
  activityScore: number; // 0-100
  collaborationScore: number; // 0-100
  overallScore: number; // 0-100
}

export interface ImpactMetrics {
  mergedPRs: number;
  criticalBugFixes: number;
  reviewDepth: number; // Average review comments per PR
  complexModuleWork: number; // Work on complex/high-value modules
  componentOwnership: string[]; // Critical components owned
}

export interface ActivityMetrics {
  messageCount: number;
  mentionsReceived: number;
  reactionsReceived: number;
  meetingParticipation: number;
  collaborationReach: number; // Number of unique collaborators
}

export interface CollaborationMetrics {
  prsReviewed: number;
  helpfulReviews: number; // Reviews marked as helpful
  issueDiscussions: number;
  mentoringActions: number;
}

export interface WorkTypeBreakdown {
  featureDevelopment: number;
  bugFixes: number;
  peerReview: number;
  refactoring: number;
  documentation: number;
}

export interface DeveloperProfile extends Developer {
  metrics: ContributionMetrics;
  impactMetrics: ImpactMetrics;
  activityMetrics: ActivityMetrics;
  collaborationMetrics: CollaborationMetrics;
  workTypeBreakdown: WorkTypeBreakdown;
  isSilentArchitect: boolean;
  impactRank: number;
  activityRank: number;
  biasGap: number; // Difference between activity and impact rank
}

export interface TimelineEntry {
  date: Date;
  developerId: string;
  type: 'pr' | 'review' | 'bugfix' | 'discussion' | 'mentoring';
  description: string;
  impact: number;
}

export interface ContributionSnapshot {
  date: Date;
  developers: DeveloperProfile[];
}

export interface AutoSummary {
  developerId: string;
  summary: string;
  keyAchievements: string[];
  recommendations: string[];
}
