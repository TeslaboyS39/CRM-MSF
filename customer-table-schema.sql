 -- Step 1: Add new columns
  ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS subscription_period INTEGER,
  ADD COLUMN IF NOT EXISTS segmentation TEXT,
  ADD COLUMN IF NOT EXISTS estimated_payment_date DATE;

  -- Step 2: Rename start_date to lead_date
  ALTER TABLE customers
  RENAME COLUMN start_date TO lead_date;

  -- Step 3: Rename expected_end_date to estimated_po_date
  ALTER TABLE customers
  RENAME COLUMN expected_end_date TO estimated_po_date;

  -- =====================================================
  -- OPTIONAL: Add constraints/comments for documentation
  -- =====================================================

  -- Add comment for segmentation column to document valid values
  COMMENT ON COLUMN customers.segmentation IS 'For On the road: Logistic, Passenger. For Off the road: Nickel,
  Coal, Plantation, Others';

  -- Add comment for subscription_period
  COMMENT ON COLUMN customers.subscription_period IS 'Subscription period in months';
