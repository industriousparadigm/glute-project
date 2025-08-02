import { NextResponse } from 'next/server'

export async function GET() {
  // Return mock data for now
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      text_pt: 'O Glute Project mudou a minha vida! Treino há 6 meses e nunca me senti tão bem.',
      text_en: 'Glute Project changed my life! I\'ve been training for 6 months and never felt better.',
      rating: 5,
      highlighted: true
    },
    {
      id: 2,
      name: 'João Ferreira',
      text_pt: 'Ambiente incrível e resultados visíveis em poucas semanas. Recomendo a todos!',
      text_en: 'Amazing atmosphere and visible results in just a few weeks. Highly recommend!',
      rating: 5,
      highlighted: true
    },
    {
      id: 3,
      name: 'Ana Costa',
      text_pt: 'A flexibilidade de horário 24/7 é perfeita para o meu estilo de vida. Treino quando quero!',
      text_en: 'The 24/7 flexibility is perfect for my lifestyle. I train whenever I want!',
      rating: 5,
      highlighted: true
    },
    {
      id: 4,
      name: 'Pedro Santos',
      text_pt: 'Os treinadores são excepcionais. Sinto-me apoiado em cada treino.',
      text_en: 'The trainers are exceptional. I feel supported in every workout.',
      rating: 5,
      highlighted: true
    },
    {
      id: 5,
      name: 'Sofia Oliveira',
      text_pt: 'Mais que um ginásio, é uma comunidade. Fiz amigos para a vida!',
      text_en: 'More than a gym, it\'s a community. I made friends for life!',
      rating: 5,
      highlighted: true
    }
  ]
  
  return NextResponse.json(testimonials)
}