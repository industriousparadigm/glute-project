-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prices table
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

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quote_pt TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  role_pt VARCHAR(255),
  role_en VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash) 
VALUES ('geral@gluteproject.pt', '$2a$10$YKvJX6H1n6kWxKJp3N5QSuVlNtkCQv3R9QWQ1Kj8Qr1Jg3XB5YXKy')
ON CONFLICT (email) DO NOTHING;

-- Insert default prices
INSERT INTO prices (key, title_pt, title_en, price_pt, price_en, description_pt, description_en, highlighted, sort_order) VALUES
('trial', 'PRIMEIRA SESSÃO', 'FIRST SESSION', 'GRÁTIS', 'FREE', 'Experimenta sem compromisso', 'Try without commitment', true, 1),
('monthly', 'MENSALIDADE', 'MONTHLY', 'A partir de €39,90', 'From €39.90', 'Acesso ilimitado 24/7', 'Unlimited 24/7 access', false, 2),
('personal', 'PERSONAL TRAINING', 'PERSONAL TRAINING', 'Sob consulta', 'Upon request', 'Planos personalizados', 'Personalized plans', false, 3)
ON CONFLICT (key) DO NOTHING;

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
('phone', '+351 123 456 789'),
('whatsapp', '+351 123 456 789'),
('email', 'geral@gluteproject.pt'),
('address_street', 'Rua Example, 123'),
('address_city', '4450-001 Matosinhos'),
('instagram', 'glute_project')
ON CONFLICT (key) DO NOTHING;