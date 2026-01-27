# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Motor Sights Fleet CRM - A single-page application for managing automotive fleet customers and vehicles. Built with vanilla JavaScript, Tailwind CSS, and Supabase backend via Cloudflare Pages Functions proxy.

## Technology Stack

- **Frontend**: HTML5, JavaScript (ES6+), Tailwind CSS (CDN)
- **Backend**: Cloudflare Pages Functions (serverless proxy)
- **Database**: Supabase (PostgreSQL)
- **Libraries**: FullCalendar v6.1.15, Sortable.js, Font Awesome 6.5.2
- **Deployment**: Cloudflare Pages

## File Structure

```
index.html                      # Main production app (Supabase via proxy)
supabase-proxy-client.js        # Frontend client (calls /api/* proxy)
functions/                      # Cloudflare Pages Functions
└── api/
    └── [[path]].js             # Supabase proxy (credentials server-side)

config.js                       # Local dev credentials (gitignored)
config.example.js               # Credentials template
index1-dev.html                 # Legacy localStorage version

project-folder/                 # DEPRECATED: Old Supabase migration attempt
```

## Architecture

**Production (Cloudflare Pages)**:
```
Browser → supabase-proxy-client.js → /api/* → Cloudflare Function → Supabase
```
- Credentials stored in Cloudflare environment variables
- Never exposed to client

**Local Development**:
- Use `config.js` with direct Supabase connection, OR
- Use `npx wrangler pages dev .` to run Functions locally

**Data Flow**: API Request → Proxy Client → Cloudflare Function → Supabase → Response

**UI Sections**: Dashboard (KPIs), Pipeline (Kanban), Customers (table), Fleet (table), Timeline (calendar), Reports, Settings

## Data Schema

| Entity | Key Fields |
|--------|------------|
| customers | id, company_name, contact_person, location, acquisition_type, estimated_revenue, number_of_device, service_type, classification_type, terrain_type, progress_status, start_date, expected_end_date, notes |
| fleet | id, plate_number, unit_brand, vehicle_type, customer_id, fms_status, install_date |
| tasks | id, customer_id, name, is_completed, due_date |
| customer_statuses | id, name, color, sort_order |
| fleet_statuses | id, name, color, sort_order |
| activity_feed | id, type, description, timestamp |

## Code Conventions

- **Database fields**: snake_case (e.g., `company_name`)
- **JavaScript variables**: camelCase (e.g., `companyName`)
- **Styling**: Dark theme (Tailwind bg-gray-900/800/700), status colors for visual distinction
- **Async operations**: Wrap in try-catch with loading overlay, use `console.error()` for logging
- **Forms**: Modal-based CRUD with basic required field validation

## Key Files

- **supabase-proxy-client.js**: Drop-in replacement for Supabase JS client, routes through `/api/*`
- **functions/api/[[path]].js**: Catches all `/api/*` requests, forwards to Supabase with credentials
- **index.html**: Main app, uses `supabaseClient.from('table')` pattern

## Development Notes

- Activity feed is limited to 10 most recent items
- CSV export headers may need updating when schema changes (see note.md)
- Kanban drag-drop identifies customers by company name
- Environment variables required on Cloudflare: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
