# Motor Sights Fleet CRM

A modern, single-page CRM application for managing automotive fleet customers and vehicles. Built with vanilla JavaScript, Tailwind CSS, and Supabase backend.

## Features

- **Dashboard** - KPIs, charts, and activity feed overview
- **Pipeline** - Kanban board for tracking customer progress (drag & drop)
- **Customer Management** - Full CRUD operations with detailed customer profiles
- **Fleet Management** - Track vehicles, installation dates, and FMS status
- **Task Management** - Assign and track tasks per customer
- **Timeline** - Calendar view of installations and due dates (FullCalendar)
- **Reports** - Export data to CSV and JSON formats
- **Settings** - Customizable status colors and labels

## Tech Stack

- **Frontend:** HTML5, JavaScript (ES6+), Tailwind CSS
- **Backend:** Supabase (PostgreSQL) via Cloudflare Pages Functions proxy
- **Libraries:** FullCalendar, Sortable.js, Font Awesome
- **Deployment:** Cloudflare Pages

## Architecture

```
Browser → Cloudflare Pages (static files)
            ↓
          /api/* requests
            ↓
        Cloudflare Pages Functions (serverless)
            ↓
        Supabase REST API
```

Credentials are stored server-side in Cloudflare environment variables, never exposed to the client.

## Getting Started

### Prerequisites

- A Supabase account and project
- A Cloudflare account

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crm-motorsights-fleet.git
   cd crm-motorsights-fleet
   ```

2. Create `config.js` from the template (for local dev only):
   ```bash
   cp config.example.js config.js
   ```

3. Edit `config.js` with your Supabase credentials.

4. For local testing with Functions, use Wrangler:
   ```bash
   npx wrangler pages dev .
   ```

### Supabase Setup

Create the following tables in your Supabase project:

- `customers` - Customer data
- `fleet` - Vehicle/fleet data
- `tasks` - Task management
- `customer_statuses` - Customizable customer status options
- `fleet_statuses` - Customizable fleet status options
- `activity_feed` - Activity logging

### Cloudflare Pages Deployment

1. Push the repository to GitHub
2. Connect to Cloudflare Pages and import the repository
3. Configure build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
4. Add environment variables in Cloudflare Pages settings:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Deploy

## Project Structure

```
├── index.html                  # Main application
├── supabase-proxy-client.js    # Frontend Supabase client (calls proxy)
├── functions/                  # Cloudflare Pages Functions (backend)
│   └── api/
│       └── [[path]].js         # Supabase proxy (credentials hidden here)
├── config.js                   # Local dev credentials (gitignored)
├── config.example.js           # Credentials template
├── build.js                    # Legacy Netlify build script
└── project-folder/             # Experimental features (WIP)
```

## Security

- Supabase credentials are stored in Cloudflare environment variables
- The `/api/*` proxy handles all database requests server-side
- No credentials are exposed in client-side code or network requests
- Enable Row Level Security (RLS) on Supabase tables for additional protection

## License

MIT License

## Author

Motor Sights Fleet Team
