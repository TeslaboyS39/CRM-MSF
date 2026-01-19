// Build script for Netlify deployment
// Generates config files from environment variables

const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('ERROR: Missing environment variables!');
    console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY in Netlify dashboard.');
    process.exit(1);
}

// Generate main config.js
const mainConfig = `// Auto-generated config file - DO NOT EDIT
// Generated at build time from environment variables
const CONFIG = {
    SUPABASE_URL: '${supabaseUrl}',
    SUPABASE_ANON_KEY: '${supabaseAnonKey}'
};
`;

fs.writeFileSync('config.js', mainConfig);
console.log('config.js generated successfully!');

// Generate project-folder/supabase-config.js
const projectFolderConfig = `// Auto-generated config file - DO NOT EDIT
// Generated at build time from environment variables

const SUPABASE_URL = '${supabaseUrl}';
const SUPABASE_ANON_KEY = '${supabaseAnonKey}';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
`;

const projectFolderPath = path.join(__dirname, 'project-folder');
if (fs.existsSync(projectFolderPath)) {
    fs.writeFileSync(path.join(projectFolderPath, 'supabase-config.js'), projectFolderConfig);
    console.log('project-folder/supabase-config.js generated successfully!');
}

console.log('Build completed!');
