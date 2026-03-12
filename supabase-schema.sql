-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.activity_feed (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  type text NOT NULL,
  description text,
  timestamp timestamp with time zone DEFAULT now(),
  CONSTRAINT activity_feed_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customer_statuses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL DEFAULT '#6B7280'::text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customer_statuses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text,
  location text,
  acquisition_type text,
  estimated_revenue integer,
  number_of_device integer,
  service_type text,
  classification_type text,
  terrain_type text,
  progress_status text,
  lead_date date,
  estimated_po_date date,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  subscription_period integer,
  segmentation text,
  estimated_payment_date date,
  CONSTRAINT customers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.fleet (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  plate_number text NOT NULL,
  unit_brand text,
  vehicle_type text,
  customer_id uuid,
  fms_status text,
  install_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fleet_pkey PRIMARY KEY (id),
  CONSTRAINT fleet_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id)
);
CREATE TABLE public.fleet_statuses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL DEFAULT '#6B7280'::text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fleet_statuses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  name text NOT NULL,
  is_completed boolean DEFAULT false,
  due_date date,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tasks_pkey PRIMARY KEY (id),
  CONSTRAINT tasks_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id)
);