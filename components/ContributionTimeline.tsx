'use client';

import { useState, useEffect } from 'react';
import { TimelineEntry } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface ContributionTimelineProps {
  developerId: string;
  developerName: string;
}

export default function ContributionTimeline({ developerId, developerName }: ContributionTimelineProps) {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const response = await fetch(`/api/timeline?developerId=${developerId}&days=90`);
        const data = await response.json();
        setTimeline(data);
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTimeline();
  }, [developerId]);

  // Aggregate by date
  const dailyAggregate = timeline.reduce((acc, entry) => {
    const dateKey = format(new Date(entry.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, impact: 0, count: 0 };
    }
    acc[dateKey].impact += entry.impact;
    acc[dateKey].count += 1;
    return acc;
  }, {} as Record<string, { date: string; impact: number; count: number }>);

  const chartData = Object.values(dailyAggregate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30); // Last 30 days

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Contribution Timeline - {developerName}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')} />
            <Legend />
            <Line type="monotone" dataKey="impact" stroke="#0284c7" name="Daily Impact" />
            <Line type="monotone" dataKey="count" stroke="#10b981" name="Activities Count" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Showing last 30 days of {timeline.length} total activities
      </div>
    </div>
  );
}
