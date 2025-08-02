import { query } from '../src/lib/db/client.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initDatabase() {
  try {
    console.log('Initializing database...')
    
    // Read schema file
    const schemaPath = path.join(__dirname, '../src/lib/db/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Execute schema
    await query(schema)
    console.log('Database schema created successfully')
    
    // Read and execute testimonials seed if it exists
    const seedPath = path.join(__dirname, '../src/lib/db/seed-testimonials.sql')
    if (fs.existsSync(seedPath)) {
      const seed = fs.readFileSync(seedPath, 'utf8')
      await query(seed)
      console.log('Testimonials seeded successfully')
    }
    
    console.log('Database initialization complete!')
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDatabase()