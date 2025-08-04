import { query } from '../src/lib/db/client'

async function migrateGoogleReviews() {
  try {
    console.log('🔄 Adding Google Reviews support to database...')
    
    // Add new columns
    await query(`
      ALTER TABLE testimonials 
      ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'manual',
      ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      ADD COLUMN IF NOT EXISTS google_author_url TEXT
    `)
    
    // Create index
    await query(`
      CREATE INDEX IF NOT EXISTS idx_testimonials_source ON testimonials(source)
    `)
    
    console.log('✅ Database migrated successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateGoogleReviews()