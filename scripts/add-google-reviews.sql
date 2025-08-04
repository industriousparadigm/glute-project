-- Add columns to support Google Reviews
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5),
ADD COLUMN IF NOT EXISTS google_author_url TEXT;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_testimonials_source ON testimonials(source);