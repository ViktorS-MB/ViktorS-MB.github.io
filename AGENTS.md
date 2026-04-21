# AI Agent Instructions

## Project Overview

This is a **React + Vite + TypeScript** presentation application for "MO360 CRAFT" - a pitch deck for a malfunction detection/product presentation.

## Tech Stack

- **React 19** with TypeScript
- **Vite 6** for bundling
- **Tailwind CSS 4** for styling
- **Motion** (framer-motion) for animations
- **Lucide React** for icons
- **Express** for backend server
- **Google Gemini API** for AI features

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type check |

## Environment Setup

Create a `.env.local` file with:
```
GEMINI_API_KEY=your_api_key_here
```

## Key Files

- [src/App.tsx](src/App.tsx) - Main application with navigation and chapter components
- [src/main.tsx](src/main.tsx) - React entry point
- [src/index.css](src/index.css) - Global styles
- [vite.config.ts](vite.config.ts) - Vite configuration with `@` path alias

## Architecture

- Single-page presentation with scroll-based navigation
- Chapter-based structure (Hero → Problem → Foundation → Limit → Vision → Demo → Business Value → Next Steps)
- Uses Motion library for smooth animations and scroll-based effects

## Path Aliases

The `@` alias maps to the project root for cleaner imports.