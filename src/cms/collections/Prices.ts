import type { CollectionConfig } from 'payload'

export const Prices: CollectionConfig = {
  slug: 'prices',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'e.g., "€39.90", "GRÁTIS", "Sob consulta"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Highlight this pricing option',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
      defaultValue: 'Escolher',
      admin: {
        description: 'Button text for this pricing option',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
}