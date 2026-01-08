'use client';

import { useState, useEffect } from 'react';
import { AutoSummary as AutoSummaryType } from '@/types';

interface AutoSummaryProps {
  developerId: string;
  developerName: string;
}

export default function AutoSummary({ developerId, developerName }: AutoSummaryProps) {
  const [summary, setSummary] = useState<AutoSummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch(`/api/summary?developerId=${developerId}`);
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [developerId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">Generating summary...</div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Auto-Generated Summary - {developerName}</h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Summary</h4>
        <p className="text-gray-600 leading-relaxed">{summary.summary}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Achievements</h4>
        <ul className="space-y-2">
          {summary.keyAchievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-600">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Recommendations</h4>
        <ul className="space-y-2">
          {summary.recommendations.map((recommendation, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">→</span>
              <span className="text-gray-600">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
