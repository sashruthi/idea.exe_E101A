'use client';

import { useState, useEffect } from 'react';
import { DeveloperProfile } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BiasAwarenessViewProps {
  developers: DeveloperProfile[];
}

export default function BiasAwarenessView({ developers }: BiasAwarenessViewProps) {
  const chartData = developers
    .sort((a, b) => b.biasGap - a.biasGap)
    .map(dev => ({
      name: dev.name.split(' ')[0],
      impactRank: dev.impactRank,
      activityRank: dev.activityRank,
      biasGap: dev.biasGap,
      isSilentArchitect: dev.isSilentArchitect ? 1 : 0,
    }));

  const silentArchitects = developers.filter(d => d.isSilentArchitect);
  const overratedByActivity = developers.filter(d => d.biasGap < -3);
  const underappreciated = developers.filter(d => d.biasGap > 3);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Bias Awareness Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-sm text-yellow-700 font-semibold mb-1">Silent Architects</div>
            <div className="text-2xl font-bold text-yellow-800">{silentArchitects.length}</div>
            <div className="text-xs text-yellow-600 mt-1">High impact, low visibility</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-700 font-semibold mb-1">Underappreciated</div>
            <div className="text-2xl font-bold text-red-800">{underappreciated.length}</div>
            <div className="text-xs text-red-600 mt-1">Impact rank > Activity rank by 3+</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm text-blue-700 font-semibold mb-1">Overrated by Activity</div>
            <div className="text-2xl font-bold text-blue-800">{overratedByActivity.length}</div>
            <div className="text-xs text-blue-600 mt-1">Activity rank > Impact rank by 3+</div>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="impactRank" fill="#0284c7" name="Impact Rank" />
              <Bar dataKey="activityRank" fill="#0ea5e9" name="Activity Rank" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {underappreciated.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Underappreciated Contributors</h3>
          <div className="space-y-2">
            {underappreciated.map(dev => (
              <div key={dev.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div>
                  <span className="font-semibold text-gray-800">{dev.name}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    (Impact: #{dev.impactRank}, Activity: #{dev.activityRank})
                  </span>
                </div>
                <span className="text-red-600 font-semibold">+{dev.biasGap} rank gap</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
