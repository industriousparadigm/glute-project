import { Client } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'
import bcrypt from 'bcryptjs'

async function initDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    await client.connect()
    console.log('Connected to database')
    console.log('Creating database tables...')
    
    // Read and execute schema
    const schema = readFileSync(join(process.cwd(), 'src/lib/db/schema.sql'), 'utf-8')
    const statements = schema.split(';').filter(s => s.trim())
    
    for (const statement of statements) {
      if (statement.trim()) {
        await client.query(statement)
      }
    }
    
    // Update admin password hash
    const password = 'admin123'
    const hash = await bcrypt.hash(password, 10)
    
    await client.query(
      'UPDATE admin_users SET password_hash = $1 WHERE email = $2',
      [hash, 'admin@gluteproject.com']
    )
    
    console.log('Database initialized successfully!')
    console.log('Admin login: admin@gluteproject.com / admin123')
    
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

initDatabase()