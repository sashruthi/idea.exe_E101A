'use client';

import { DeveloperProfile } from '@/types';
import ScoreCard from './ScoreCard';

interface DeveloperCardProps {
  developer: DeveloperProfile;
  onClick?: () => void;
}

export default function DeveloperCard({ developer, onClick }: DeveloperCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow ${
        developer.isSilentArchitect ? 'border-l-4 border-yellow-500' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-lg">
              {developer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {developer.name}
                {developer.isSilentArchitect && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Silent Architect
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600">{developer.role}</p>
              <p className="text-xs text-gray-500">{developer.team} Team</p>
            </div>
          </div>
        </div>
      </div>

      <ScoreCard title="" metrics={developer.metrics} />

      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Impact Rank:</span>
          <span className="ml-2 font-semibold text-gray-800">#{developer.impactRank}</span>
        </div>
        <div>
          <span className="text-gray-500">Activity Rank:</span>
          <span className="ml-2 font-semibold text-gray-800">#{developer.activityRank}</span>
        </div>
        {developer.biasGap !== 0 && (
          <div className="col-span-2">
            <span className="text-gray-500">Bias Gap:</span>
            <span className={`ml-2 font-semibold ${developer.biasGap > 0 ? 'text-red-600' : 'text-blue-600'}`}>
              {developer.biasGap > 0 ? '+' : ''}{developer.biasGap} positions
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
