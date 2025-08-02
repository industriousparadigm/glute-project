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
    // Add more testimonials
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