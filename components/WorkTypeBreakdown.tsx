'use client';

import { WorkTypeBreakdown } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface WorkTypeBreakdownProps {
  breakdown: WorkTypeBreakdown;
  developerName: string;
}

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function WorkTypeBreakdown({ breakdown, developerName }: WorkTypeBreakdownProps) {
  const data = [
    { name: 'Features', value: Math.round(breakdown.featureDevelopment) },
    { name: 'Bug Fixes', value: Math.round(breakdown.bugFixes) },
    { name: 'Peer Review', value: Math.round(breakdown.peerReview) },
    { name: 'Refactoring', value: Math.round(breakdown.refactoring) },
    { name: 'Documentation', value: Math.round(breakdown.documentation) },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Work Type Breakdown - {developerName}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-gray-600">{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
