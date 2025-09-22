# FEnthusiast - Frontend Learning Platform

A modern educational platform for learning frontend development with a unique pencil-sketch notebook aesthetic.

## Features

- 🎨 Unique pencil-sketch on paper design aesthetic
- 📱 Fully responsive design with mobile-first approach
- 🎥 Video and text-based learning materials
- 📊 Progress tracking and goal setting
- 🔐 Authentication system with user profiles
- 🎯 Interactive learning dashboard
- 📚 Comprehensive materials management
- 🌙 Dark/light theme support

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: TailwindCSS v4 with shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Jotai
- **Icons**: Lucide React
- **Architecture**: Atomic Design Pattern

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
├── components/
│   ├── atoms/             # Basic UI components
│   ├── molecules/         # Composite components
│   └── organisms/         # Complex components
├── lib/                   # Utilities and configurations
└── public/               # Static assets
\`\`\`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

This project uses Husky for pre-commit hooks and lint-staged for code quality.
