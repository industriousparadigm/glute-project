-- Insert sample testimonials
INSERT INTO testimonials (name, quote_pt, quote_en, role_pt, role_en, rating, featured) VALUES
('Maria Silva', 'O Glute Project mudou a minha vida! Treino há 6 meses e nunca me senti tão bem.', 'Glute Project changed my life! I''ve been training for 6 months and never felt better.', 'Membro desde 2023', 'Member since 2023', 5, true),
('João Ferreira', 'Ambiente incrível e resultados visíveis em poucas semanas. Recomendo a todos!', 'Amazing atmosphere and visible results in just a few weeks. Highly recommend!', 'Personal Training', 'Personal Training', 5, true),
('Ana Costa', 'A flexibilidade de horário 24/7 é perfeita para o meu estilo de vida. Treino quando quero!', 'The 24/7 flexibility is perfect for my lifestyle. I train whenever I want!', 'Membro Premium', 'Premium Member', 5, true),
('Pedro Santos', 'Os treinadores são excepcionais. Sinto-me apoiado em cada treino.', 'The trainers are exceptional. I feel supported in every workout.', 'Membro desde 2024', 'Member since 2024', 5, true),
('Sofia Oliveira', 'Mais que um ginásio, é uma comunidade. Fiz amigos para a vida!', 'More than a gym, it''s a community. I made friends for life!', 'Membro Fundador', 'Founding Member', 5, true)
ON CONFLICT DO NOTHING;