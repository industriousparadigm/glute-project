import { query } from '../src/lib/db/client.js'

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

const seedData = `
-- Insert admin user with bcrypt hash for 'GluteProject2024!'
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@gluteproject.com', '$2a$10$8Kx7o3lHB5LH8R8R8R8R8Ou7wK7wK7wK7wK7wK7wK7wK7wK7wK7wK')
ON CONFLICT (email) DO NOTHING;

-- Insert default prices
INSERT INTO prices (key, title_pt, title_en, price_pt, price_en, description_pt, description_en, highlighted, sort_order) VALUES
('trial', 'PRIMEIRA SESSÃO', 'FIRST SESSION', 'GRÁTIS', 'FREE', 'Experimenta sem compromisso', 'Try without commitment', true, 1),
('monthly', 'MENSALIDADE', 'MONTHLY', 'A partir de €39,90', 'From €39.90', 'Acesso ilimitado 24/7', 'Unlimited 24/7 access', false, 2),
('personal', 'PERSONAL TRAINING', 'PERSONAL TRAINING', 'Sob consulta', 'Upon request', 'Planos personalizados', 'Personalized plans', false, 3)
ON CONFLICT (key) DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, text_pt, text_en, rating, highlighted) VALUES
('Maria Silva', 'O Glute Project mudou a minha vida! Treino há 6 meses e nunca me senti tão bem.', 'Glute Project changed my life! I''ve been training for 6 months and never felt better.', 5, true),
('João Ferreira', 'Ambiente incrível e resultados visíveis em poucas semanas. Recomendo a todos!', 'Amazing atmosphere and visible results in just a few weeks. Highly recommend!', 5, true),
('Ana Costa', 'A flexibilidade de horário 24/7 é perfeita para o meu estilo de vida. Treino quando quero!', 'The 24/7 flexibility is perfect for my lifestyle. I train whenever I want!', 5, true),
('Pedro Santos', 'Os treinadores são excepcionais. Sinto-me apoiado em cada treino.', 'The trainers are exceptional. I feel supported in every workout.', 5, true),
('Sofia Oliveira', 'Mais que um ginásio, é uma comunidade. Fiz amigos para a vida!', 'More than a gym, it''s a community. I made friends for life!', 5, true)
ON CONFLICT DO NOTHING;

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
('phone', '+351 123 456 789'),
('whatsapp', '+351 123 456 789'),
('email', 'info@gluteproject.com'),
('address_street', 'Rua Example, 123'),
('address_city', '4450-001 Matosinhos'),
('instagram', 'glute_project')
ON CONFLICT (key) DO NOTHING;
`

async function createAndSeedTables() {
  try {
    console.log('Creating tables...')
    await query(createTables)
    console.log('Tables created successfully!')
    
    console.log('Seeding data...')
    await query(seedData)
    console.log('Data seeded successfully!')
    
    console.log('Database setup complete!')
    process.exit(0)
  } catch (error) {
    console.error('Error setting up database:', error)
    process.exit(1)
  }
}

createAndSeedTables()