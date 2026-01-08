'use client';

import { ContributionMetrics } from '@/types';

interface ScoreCardProps {
  title: string;
  metrics: ContributionMetrics;
  highlight?: boolean;
}

export default function ScoreCard({ title, metrics, highlight }: ScoreCardProps) {
  const scoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${highlight ? 'ring-2 ring-primary-500' : ''}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Overall Score</span>
            <span className={`text-2xl font-bold ${scoreColor(metrics.overallScore)}`}>
              {metrics.overallScore}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${scoreColor(metrics.overallScore).replace('text-', 'bg-')}`}
              style={{ width: `${metrics.overallScore}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Impact</div>
            <div className={`text-lg font-semibold ${scoreColor(metrics.impactScore)}`}>
              {metrics.impactScore}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Activity</div>
            <div className={`text-lg font-semibold ${scoreColor(metrics.activityScore)}`}>
              {metrics.activityScore}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Collaboration</div>
            <div className={`text-lg font-semibold ${scoreColor(metrics.collaborationScore)}`}>
              {metrics.collaborationScore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
