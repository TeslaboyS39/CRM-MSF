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
- **Backend:** Supabase (PostgreSQL)
- **Libraries:** FullCalendar, Sortable.js, Font Awesome
- **Deployment:** Netlify

## Getting Started

### Prerequisites

- A Supabase account and project
- Node.js (for Netlify build)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crm-motorsights-fleet.git
   cd crm-motorsights-fleet
   ```

2. Create `config.js` from the template:
   ```bash
   cp config.example.js config.js
   ```

3. Edit `config.js` with your Supabase credentials:
   ```javascript
   const CONFIG = {
       SUPABASE_URL: 'your-supabase-url',
       SUPABASE_ANON_KEY: 'your-supabase-anon-key'
   };
   ```

4. Open `index.html` with Live Server or any local server.

### Supabase Setup

Create the following tables in your Supabase project:

- `customers` - Customer data
- `fleet` - Vehicle/fleet data
- `tasks` - Task management
- `customer_statuses` - Customizable customer status options
- `fleet_statuses` - Customizable fleet status options
- `activity_feed` - Activity logging

### Netlify Deployment

1. Push the repository to GitHub
2. Connect to Netlify and import the repository
3. Add environment variables in Netlify dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy - the build script will generate config files automatically

## Project Structure

```
├── index.html              # Main application
├── config.js               # Supabase credentials (gitignored)
├── config.example.js       # Credentials template
├── build.js                # Netlify build script
├── netlify.toml            # Netlify configuration
└── project-folder/         # Experimental features (WIP)
```

## License

MIT License

## Author

Motor Sights Fleet Team
