// Simple API to fetch content from JSON files
// This can be easily replaced with any CMS API later

export async function getPrices() {
  // For now, return static data
  // Later, this can fetch from Payload/Strapi/Directus API
  return [
    {
      id: 'trial',
      title: { pt: 'PRIMEIRA SESSÃO', en: 'FIRST SESSION' },
      price: { pt: 'GRÁTIS', en: 'FREE' },
      description: { pt: 'Experimenta sem compromisso', en: 'Try without commitment' },
      highlighted: true,
    },
    {
      id: 'monthly',
      title: { pt: 'MENSALIDADE', en: 'MONTHLY' },
      price: { pt: 'A partir de €39,90', en: 'From €39.90' },
      description: { pt: 'Acesso ilimitado 24/7', en: 'Unlimited 24/7 access' },
      highlighted: false,
    },
    {
      id: 'personal',
      title: { pt: 'PERSONAL TRAINING', en: 'PERSONAL TRAINING' },
      price: { pt: 'Sob consulta', en: 'Upon request' },
      description: { pt: 'Planos personalizados', en: 'Personalized plans' },
      highlighted: false,
    },
  ]
}

export async function getTestimonials() {
  return [
    {
      id: '1',
      name: 'Maria Silva',
      quote: {
        pt: 'O Glute Project mudou a minha vida! Treino há 6 meses e nunca me senti tão bem.',
        en: 'Glute Project changed my life! I\'ve been training for 6 months and never felt better.',
      },
      role: {
        pt: 'Membro desde 2023',
        en: 'Member since 2023',
      },
      rating: 5,
    },
    {
      id: '2',
      name: 'João Ferreira',
      quote: {
        pt: 'Ambiente incrível e resultados visíveis em poucas semanas. Recomendo a todos!',
        en: 'Amazing atmosphere and visible results in just a few weeks. Highly recommend!',
      },
      role: {
        pt: 'Personal Training',
        en: 'Personal Training',
      },
      rating: 5,
    },
    {
      id: '3',
      name: 'Ana Costa',
      quote: {
        pt: 'A flexibilidade de horário 24/7 é perfeita para o meu estilo de vida. Treino quando quero!',
        en: 'The 24/7 flexibility is perfect for my lifestyle. I train whenever I want!',
      },
      role: {
        pt: 'Membro Premium',
        en: 'Premium Member',
      },
      rating: 5,
    },
    {
      id: '4',
      name: 'Pedro Santos',
      quote: {
        pt: 'Os treinadores são excepcionais. Sinto-me apoiado em cada treino.',
        en: 'The trainers are exceptional. I feel supported in every workout.',
      },
      role: {
        pt: 'Membro desde 2024',
        en: 'Member since 2024',
      },
      rating: 5,
    },
    {
      id: '5',
      name: 'Sofia Oliveira',
      quote: {
        pt: 'Mais que um ginásio, é uma comunidade. Fiz amigos para a vida!',
        en: 'More than a gym, it\'s a community. I made friends for life!',
      },
      role: {
        pt: 'Membro Fundador',
        en: 'Founding Member',
      },
      rating: 5,
    },
  ]
}

export async function getSiteSettings() {
  return {
    phone: '+351 123 456 789',
    whatsapp: '+351 123 456 789',
    email: 'info@gluteproject.com',
    address: {
      street: 'Rua Example, 123',
      city: '4450-001 Matosinhos',
    },
    instagram: 'glute_project',
  }
}