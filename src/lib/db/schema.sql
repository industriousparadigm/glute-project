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

-- Online users table (Clerk integration)
CREATE TABLE IF NOT EXISTS online_users (
  id SERIAL PRIMARY KEY,
  clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Online packages table
CREATE TABLE IF NOT EXISTS online_packages (
  id SERIAL PRIMARY KEY,
  name_pt VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_pt TEXT,
  description_en TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  stripe_price_id VARCHAR(255),
  stripe_product_id VARCHAR(255),
  features_pt JSONB,
  features_en JSONB,
  is_popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES online_users(id) ON DELETE CASCADE,
  package_id INTEGER REFERENCES online_packages(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment history table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES online_users(id),
  subscription_id INTEGER REFERENCES user_subscriptions(id),
  stripe_payment_intent_id VARCHAR(255),
  stripe_invoice_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(50),
  payment_method VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default online packages
INSERT INTO online_packages (
  name_pt, name_en, description_pt, description_en,
  price_monthly, features_pt, features_en, is_popular
) VALUES
(
  'STARTER', 'STARTER',
  'Perfeito para começar', 'Perfect to get started',
  49.00,
  '["Plano de treino personalizado", "Atualização mensal do plano", "Suporte via email", "Acesso app Regybox"]'::jsonb,
  '["Personalized training plan", "Monthly plan updates", "Email support", "Regybox app access"]'::jsonb,
  false
),
(
  'PRO', 'PRO',
  'Mais acompanhamento e resultados', 'More support and results',
  89.00,
  '["Tudo do Starter", "Videochamadas semanais", "Ajustes de plano ilimitados", "Plano nutricional básico", "Suporte WhatsApp prioritário"]'::jsonb,
  '["Everything in Starter", "Weekly video calls", "Unlimited plan adjustments", "Basic nutrition plan", "Priority WhatsApp support"]'::jsonb,
  true
),
(
  'ELITE', 'ELITE',
  'Acompanhamento premium completo', 'Complete premium coaching',
  149.00,
  '["Tudo do Pro", "Check-ins diários via WhatsApp", "Plano nutricional completo", "Análise de progresso semanal", "Acesso à comunidade privada"]'::jsonb,
  '["Everything in Pro", "Daily WhatsApp check-ins", "Complete nutrition plan", "Weekly progress analysis", "Private community access"]'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_online_users_clerk_id ON online_users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_online_users_stripe_customer ON online_users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON user_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);