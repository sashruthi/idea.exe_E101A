# Workforce Contribution Monitor

A system that helps managers understand real contribution in engineering teams by distinguishing visible activity from actual impact. It highlights high-impact, low-visibility contributors, referred to as "Silent Architects," and supports fair, data-backed performance evaluation.

## Features

- **Comprehensive Contribution Scoring**: Calculate Impact, Activity, and Collaboration scores based on GitHub and Slack metadata
- **Silent Architect Detection**: Automatically identify high-impact, low-visibility contributors
- **Bias Awareness View**: Reveal differences between activity-based and impact-based rankings
- **Contribution Timeline Replay**: Visualize long-term contributions over time
- **Auto-Generated Summaries**: Create concise, readable reports for each developer
- **Work-Type Breakdown**: Distinguish feature development, bug fixes, peer review, and other contribution types
- **Fair Comparison Guardrails**: Ensure employees are compared within similar roles
- **Ethics & Privacy Mode**: Metadata-only analysis, preserving privacy while keeping human judgment central

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React 18** for UI components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
hacktide/
├── app/
│   ├── api/              # API routes for data fetching
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard page
├── components/           # React components
│   ├── AutoSummary.tsx
│   ├── BiasAwarenessView.tsx
│   ├── ContributionTimeline.tsx
│   ├── DeveloperCard.tsx
│   ├── ScoreCard.tsx
│   └── WorkTypeBreakdown.tsx
├── lib/                  # Utility functions and data
│   └── mockData.ts       # Mock data generators
├── types/                # TypeScript type definitions
│   └── index.ts
└── package.json
```

## Usage

The dashboard displays:

1. **Overview**: List of all developers with their contribution scores
2. **Bias Awareness**: Analysis of ranking differences between impact and activity metrics
3. **Developer Details**: Detailed view of individual developer contributions including:
   - Auto-generated summary
   - Work type breakdown
   - Contribution timeline

## Data Sources

Currently uses mock data. In a production environment, this would integrate with:
- **GitHub API**: Pull requests, code reviews, bug fixes, component ownership
- **Slack API**: Message counts, mentions, reactions (metadata only)

## Scoring Methodology

### Impact Score (0-100)
Based on:
- Merged pull requests
- Critical bug fixes
- Review depth
- Work on complex modules

### Activity Score (0-100)
Based on:
- Communication presence (message counts)
- Collaboration reach
- Peer support metrics

### Collaboration Score (0-100)
Based on:
- PRs reviewed
- Helpful reviews
- Issue discussions
- Mentoring actions

## Privacy & Ethics

- **Metadata-Only Analysis**: No content scanning, only metadata is analyzed
- **Role-Based Comparisons**: Fair comparison guardrails ensure comparisons within similar roles
- **Human Judgment Central**: System supports but doesn't replace managerial judgment

## License

MIT
