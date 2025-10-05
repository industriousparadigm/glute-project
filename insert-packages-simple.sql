-- Insert packages ONE BY ONE to avoid formatting issues
INSERT INTO online_packages (name_pt, name_en, description_pt, description_en, price_monthly, is_popular, active) VALUES ('STARTER', 'STARTER', 'Perfeito para começar', 'Perfect to get started', 49.00, false, true);

INSERT INTO online_packages (name_pt, name_en, description_pt, description_en, price_monthly, is_popular, active) VALUES ('PRO', 'PRO', 'Mais acompanhamento e resultados', 'More support and results', 89.00, true, true);

INSERT INTO online_packages (name_pt, name_en, description_pt, description_en, price_monthly, is_popular, active) VALUES ('ELITE', 'ELITE', 'Acompanhamento premium completo', 'Complete premium coaching', 149.00, false, true);

-- Update features separately
UPDATE online_packages SET features_pt = '["Plano de treino personalizado", "Atualização mensal do plano", "Suporte via email", "Acesso app Regybox"]'::jsonb WHERE name_pt = 'STARTER';

UPDATE online_packages SET features_en = '["Personalized training plan", "Monthly plan updates", "Email support", "Regybox app access"]'::jsonb WHERE name_en = 'STARTER';

UPDATE online_packages SET features_pt = '["Tudo do Starter", "Videochamadas semanais", "Ajustes de plano ilimitados", "Plano nutricional básico", "Suporte WhatsApp prioritário"]'::jsonb WHERE name_pt = 'PRO';

UPDATE online_packages SET features_en = '["Everything in Starter", "Weekly video calls", "Unlimited plan adjustments", "Basic nutrition plan", "Priority WhatsApp support"]'::jsonb WHERE name_en = 'PRO';

UPDATE online_packages SET features_pt = '["Tudo do Pro", "Check-ins diários via WhatsApp", "Plano nutricional completo", "Análise de progresso semanal", "Acesso à comunidade privada"]'::jsonb WHERE name_pt = 'ELITE';

UPDATE online_packages SET features_en = '["Everything in Pro", "Daily WhatsApp check-ins", "Complete nutrition plan", "Weekly progress analysis", "Private community access"]'::jsonb WHERE name_en = 'ELITE';
