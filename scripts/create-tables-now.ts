import { config } from 'dotenv'
import { Pool } from 'pg'
import path from 'path'

// Load env vars from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

const createTables = `
-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prices (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  title_pt VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  price_pt VARCHAR(100) NOT NULL,
  price_en VARCHAR(100) NOT NULL,
  description_pt TEXT,
  description_en TEXT,
  highlighted BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  text_pt TEXT NOT NULL,
  text_en TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  highlighted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

async function createAndSeedTables() {
  try {
    console.log('Connection string:', process.env.DATABASE_URL ? 'Found' : 'Not found')
    
    console.log('Creating tables...')
    await pool.query(createTables)
    console.log('Tables created successfully!')
    
    // Create admin user with proper bcrypt hash
    const bcrypt = await import('bcryptjs')
    const passwordHash = await bcrypt.hash('GluteProject2024!', 10)
    
    await pool.query(
      "INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      ['admin@gluteproject.com', passwordHash]
    )
    console.log('Admin user created!')
    
    console.log('Database setup complete!')
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error('Error setting up database:', error)
    await pool.end()
    process.exit(1)
  }
}

createAndSeedTables()