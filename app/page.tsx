'use client';

import { useState, useEffect } from 'react';
import { DeveloperProfile } from '@/types';
import DeveloperCard from '@/components/DeveloperCard';
import BiasAwarenessView from '@/components/BiasAwarenessView';
import ContributionTimeline from '@/components/ContributionTimeline';
import WorkTypeBreakdown from '@/components/WorkTypeBreakdown';
import AutoSummary from '@/components/AutoSummary';

export default function Dashboard() {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperProfile | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'bias' | 'developer'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const response = await fetch('/api/developers');
        const data = await response.json();
        setDevelopers(data);
        if (data.length > 0) {
          setSelectedDeveloper(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch developers:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDevelopers();
  }, []);

  const handleDeveloperClick = (developer: DeveloperProfile) => {
    setSelectedDeveloper(developer);
    setActiveView('developer');
  };

  const silentArchitects = developers.filter(d => d.isSilentArchitect);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard...</div>
          <div className="text-sm text-gray-500">Initializing Workforce Contribution Monitor</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Workforce Contribution Monitor</h1>
              <p className="text-sm text-gray-600 mt-1">
                Understanding real contribution in engineering teams
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{developers.length}</span> Developers
              </div>
              {silentArchitects.length > 0 && (
                <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <span className="font-semibold">{silentArchitects.length}</span> Silent Architects
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('bias')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'bias'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bias Awareness
            </button>
            {selectedDeveloper && (
              <button
                onClick={() => setActiveView('developer')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeView === 'developer'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {selectedDeveloper.name} - Details
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'overview' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">System Overview</h2>
              <p className="text-blue-800 mb-4">
                This system helps managers understand real contribution by distinguishing visible activity from actual impact.
                It highlights "Silent Architects" - high-impact, low-visibility contributors.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600">Total Developers</div>
                  <div className="text-2xl font-bold text-gray-900">{developers.length}</div>
                </div>
                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600">Silent Architects</div>
                  <div className="text-2xl font-bold text-yellow-600">{silentArchitects.length}</div>
                </div>
                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600">Avg Impact Score</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(developers.reduce((sum, d) => sum + d.metrics.impactScore, 0) / developers.length)}
                  </div>
                </div>
                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600">Avg Overall Score</div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(developers.reduce((sum, d) => sum + d.metrics.overallScore, 0) / developers.length)}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Developer Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developers
                  .sort((a, b) => b.metrics.overallScore - a.metrics.overallScore)
                  .map((developer) => (
                    <DeveloperCard
                      key={developer.id}
                      developer={developer}
                      onClick={() => handleDeveloperClick(developer)}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'bias' && (
          <div>
            <BiasAwarenessView developers={developers} />
          </div>
        )}

        {activeView === 'developer' && selectedDeveloper && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-2xl">
                    {selectedDeveloper.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {selectedDeveloper.name}
                      {selectedDeveloper.isSilentArchitect && (
                        <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                          Silent Architect
                        </span>
                      )}
                    </h2>
                    <p className="text-gray-600">{selectedDeveloper.role} • {selectedDeveloper.team} Team</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Impact Metrics</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Merged PRs:</span>
                      <span className="font-semibold">{selectedDeveloper.impactMetrics.mergedPRs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Critical Bug Fixes:</span>
                      <span className="font-semibold">{selectedDeveloper.impactMetrics.criticalBugFixes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Review Depth:</span>
                      <span className="font-semibold">{selectedDeveloper.impactMetrics.reviewDepth.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complex Module Work:</span>
                      <span className="font-semibold">{selectedDeveloper.impactMetrics.complexModuleWork}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Activity Metrics</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Messages:</span>
                      <span className="font-semibold">{selectedDeveloper.activityMetrics.messageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mentions:</span>
                      <span className="font-semibold">{selectedDeveloper.activityMetrics.mentionsReceived}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reactions:</span>
                      <span className="font-semibold">{selectedDeveloper.activityMetrics.reactionsReceived}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Meeting Participation:</span>
                      <span className="font-semibold">{selectedDeveloper.activityMetrics.meetingParticipation}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AutoSummary developerId={selectedDeveloper.id} developerName={selectedDeveloper.name} />
            <WorkTypeBreakdown breakdown={selectedDeveloper.workTypeBreakdown} developerName={selectedDeveloper.name} />
            <ContributionTimeline developerId={selectedDeveloper.id} developerName={selectedDeveloper.name} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">Ethics & Privacy Mode:</span> Metadata-only analysis, no content scanning
              </div>
              <div>
                <span className="font-semibold">Fair Comparison Guardrails:</span> Role-based comparisons enabled
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
