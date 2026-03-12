 -- =============================================
  -- Motor Sights Fleet CRM - Database Schema
  -- =============================================

  -- 1. Customer Statuses (lookup table)
  CREATE TABLE customer_statuses (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT '#6B7280',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 2. Fleet Statuses (lookup table)
  CREATE TABLE fleet_statuses (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT '#6B7280',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 3. Customers (main entity)
  CREATE TABLE customers (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_person TEXT,
      location TEXT,
      acquisition_type TEXT,
      estimated_revenue INTEGER,
      number_of_device INTEGER,
      service_type TEXT,
      classification_type TEXT,
      terrain_type TEXT,
      progress_status TEXT,
      start_date DATE,
      expected_end_date DATE,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 4. Fleet (linked to customers)
  CREATE TABLE fleet (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      plate_number TEXT NOT NULL,
      unit_brand TEXT,
      vehicle_type TEXT,
      customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
      fms_status TEXT,
      install_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 5. Tasks (linked to customers)
  CREATE TABLE tasks (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      is_completed BOOLEAN DEFAULT FALSE,
      due_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 6. Activity Feed
  CREATE TABLE activity_feed (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      type TEXT NOT NULL,
      description TEXT,
      timestamp TIMESTAMPTZ DEFAULT NOW()
  );

  -- =============================================
  -- Indexes for better query performance
  -- =============================================
  CREATE INDEX idx_customers_progress_status ON customers(progress_status);
  CREATE INDEX idx_customers_company_name ON customers(company_name);
  CREATE INDEX idx_fleet_customer_id ON fleet(customer_id);
  CREATE INDEX idx_fleet_plate_number ON fleet(plate_number);
  CREATE INDEX idx_tasks_customer_id ON tasks(customer_id);
  CREATE INDEX idx_activity_feed_timestamp ON activity_feed(timestamp DESC);

  -- =============================================
  -- Enable Row Level Security (RLS)
  -- For public access (anon key), allow all operations
  -- =============================================
  ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
  ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
  ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
  ALTER TABLE customer_statuses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE fleet_statuses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

  -- Policies for public access (using anon key)
  CREATE POLICY "Allow all for customers" ON customers FOR ALL USING (true) WITH CHECK (true);
  CREATE POLICY "Allow all for fleet" ON fleet FOR ALL USING (true) WITH CHECK (true);
  CREATE POLICY "Allow all for tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
  CREATE POLICY "Allow all for customer_statuses" ON customer_statuses FOR ALL USING (true) WITH CHECK (true);
  CREATE POLICY "Allow all for fleet_statuses" ON fleet_statuses FOR ALL USING (true) WITH CHECK (true);
  CREATE POLICY "Allow all for activity_feed" ON activity_feed FOR ALL USING (true) WITH CHECK (true);

  -- =============================================
  -- Insert default statuses
  -- =============================================
  INSERT INTO customer_statuses (name, color, sort_order) VALUES
      ('New Lead', '#3B82F6', 1),
      ('Contacted', '#F59E0B', 2),
      ('Proposal Sent', '#8B5CF6', 3),
      ('Negotiation', '#EC4899', 4),
      ('Won', '#10B981', 5),
      ('Lost', '#EF4444', 6);

  INSERT INTO fleet_statuses (name, color, sort_order) VALUES
      ('Pending Install', '#F59E0B', 1),
      ('Active', '#10B981', 2),
      ('Maintenance', '#8B5CF6', 3),
      ('Inactive', '#6B7280', 4);
