# Momence Exchange Rates

A React TypeScript application for currency conversion and exchange rate visualization. The app fetches real-time
exchange rates from the Czech National Bank (CNB) API and provides currency
conversion with historical rate charts.

**Live Demo:** https://momence-exchange-rates.vercel.app/

## Features

- **Currency Converter**: Convert between CZK and various international currencies using current CNB rates
- **Rate Chart**: Interactive yearly chart showing exchange rate trends for selected currencies
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Real-time Data**: Fetches current exchange rates from Czech National Bank official API
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: TanStack React Query for server state
- **Styling**: Styled Components with theme support
- **Charts**: Recharts for data visualization
- **Testing**: Cypress for E2E testing
- **Deployment**: Vercel (Frontend + Serverless Functions)
- **API Proxy**: Express.js to handle CORS and CNB API integration

## Quick Start

1. Install dependencies
    - `npm install`
2. Start the app (Vite + proxy)
    - `npm run dev`
    - The app runs at http://localhost:5173 and proxy at http://localhost:3001
3. Run Cypress
    - Interactive: `npm run cy:open`
    - Headless: `npm run cy:run`

---

## Deployment on Vercel

- Frontend is built with Vite and deployed as static output from `dist`.
- API proxy is implemented as Vercel Serverless Functions under `/api`:
    - GET /api/daily
    - GET /api/yearly?year=YYYY
- SPA rewrites are configured in `vercel.json` so client-side routing works.

Locally, the frontend calls relative `/api/*` paths. Vite dev server proxies these to the local Express proxy
running on port 3001, so dev and production use the same paths.

## Automation

- CI: GitHub Actions workflow `.github/workflows/ci.yml` lints, builds, and runs Cypress on push/PR.

Useful scripts:

- `npm run test:e2e` – starts dev servers, waits for them, then runs Cypress headless

## Possible improvements

- **Features**: Historical rates for multiple years, currency conversion to other currencies,
  show exchange rate trends
- **Testing**: Add unit tests for utils and api. Extend Cypress tests coverage instead of current simple E2E tests.
- **UX**: Loading states, error boundaries, skeleton screens
- **Accessibility**: Extend ARIA labels, keyboard navigation for not supported components.
- **Internationalization**: i18n support for multiple languages
- **Security**: Better input validation, rate limiting on API
- **Monitoring**: Error tracking (Sentry, Datadog), analytics
- **Code Quality**: Absolute imports, barrel exports, stricter ESLint rules,
- **CI/CD**: Actual CI/CD pipeline, automatic deployment to Vercel
- **Documentation**: Storybook for components, API docs
