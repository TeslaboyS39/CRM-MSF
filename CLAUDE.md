# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Motor Sights Fleet CRM - A single-page application for managing automotive fleet customers and vehicles. Built with vanilla JavaScript and Tailwind CSS.

## Technology Stack

- **Frontend**: HTML5, JavaScript (ES6+), Tailwind CSS (CDN)
- **Data Storage**: localStorage with JSON import/export
- **Libraries**: FullCalendar v6.1.15, Sortable.js, Font Awesome 6.5.2
- **No build process**: All dependencies loaded via CDN

## File Structure

```
index1-dev.html              # MAIN DEVELOPMENT FILE (localStorage + JSON import/export)
motorsights_crm_backup_*.json # Data backup files

project-folder/              # EXPERIMENTAL: Supabase migration attempt (WIP)
├── index.html               # Supabase-backed version
├── db-operations.js         # Database CRUD functions
├── supabase-config.js       # Supabase client initialization
├── migrate-data.html        # localStorage → Supabase migration tool
└── test-connection.html     # Database connection testing
```

## Architecture

**Main App (index1-dev.html)**:
- Data stored in localStorage
- JSON export/import for backup and data transfer
- All logic embedded in single HTML file

**Data Flow**: Load from localStorage → In-Memory Arrays → Render UI → User Action → Save to localStorage

**UI Sections**: Dashboard (KPIs), Pipeline (Kanban), Customers (table), Fleet (table), Timeline (calendar), Settings (status management)

**Supabase Version (project-folder/)** - Experimental migration:
- `loadAllData()` - Fetches all entities via `Promise.all()`
- `saveCustomer()`, `saveFleet()`, `saveTask()` - Insert/update with activity logging
- `addActivity()` - Logs actions to activity_feed table

## Data Schema

Applies to both localStorage (main) and Supabase (experimental) versions:

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

## Development Notes

- **Main development**: Work on `index1-dev.html` - uses localStorage with JSON import/export
- **Supabase migration**: `project-folder/` is experimental; test connectivity via `test-connection.html`
- Activity feed is limited to 10 most recent items
- CSV export headers may need updating when schema changes (see note.md)
- Kanban drag-drop identifies customers by company name
