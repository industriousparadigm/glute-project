import { getPayload } from 'payload'
import config from '../src/payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  try {
    console.log('Creating admin user...')
    
    // Create admin user
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@gluteproject.com',
        password: 'admin123',
        role: 'admin',
      },
    })

    console.log('Admin user created successfully!')
    console.log('Email: admin@gluteproject.com')
    console.log('Password: admin123')
    
    // Create initial site settings
    await payload.create({
      collection: 'site-settings',
      data: {
        siteName: 'Glute Project',
        phone: '+351 123 456 789',
        whatsapp: '+351 123 456 789',
        email: 'info@gluteproject.com',
        address: {
          street: 'Rua Example, 123',
          city: '4450-001 Matosinhos',
        },
        instagram: 'glute_project',
        hours: {
          pt: 'Aberto 24/7',
          en: 'Open 24/7',
        },
      },
    })

    console.log('Site settings created successfully!')

    // Create sample pricing
    const pricingData = [
      {
        title: { pt: 'PRIMEIRA SESSÃO', en: 'FIRST SESSION' },
        price: { pt: 'GRÁTIS', en: 'FREE' },
        description: { pt: 'Experimenta sem compromisso', en: 'Try without commitment' },
        highlighted: true,
        ctaText: { pt: 'EXPERIMENTAR', en: 'TRY NOW' },
        order: 1,
      },
      {
        title: { pt: 'MENSALIDADE', en: 'MONTHLY' },
        price: { pt: 'A partir de €39,90', en: 'From €39.90' },
        description: { pt: 'Acesso ilimitado 24/7', en: 'Unlimited 24/7 access' },
        features: {
          pt: [
            { feature: 'Acesso 24 horas' },
            { feature: 'Acompanhamento profissional' },
            { feature: 'Plano de treino personalizado' },
          ],
          en: [
            { feature: '24 hour access' },
            { feature: 'Professional guidance' },
            { feature: 'Personalized training plan' },
          ],
        },
        highlighted: false,
        ctaText: { pt: 'ESCOLHER', en: 'CHOOSE' },
        order: 2,
      },
      {
        title: { pt: 'PERSONAL TRAINING', en: 'PERSONAL TRAINING' },
        price: { pt: 'Sob consulta', en: 'Upon request' },
        description: { pt: 'Planos personalizados', en: 'Personalized plans' },
        highlighted: false,
        ctaText: { pt: 'CONTACTAR', en: 'CONTACT' },
        order: 3,
      },
    ]

    for (const price of pricingData) {
      await payload.create({
        collection: 'prices',
        data: price,
      })
    }

    console.log('Pricing data created successfully!')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()