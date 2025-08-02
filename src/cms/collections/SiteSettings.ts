import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'siteName',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Glute Project',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
            {
              name: 'whatsapp',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                  defaultValue: '4450-001 Matosinhos',
                },
                {
                  name: 'googleMapsUrl',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              admin: {
                description: 'Instagram username (without @)',
              },
            },
            {
              name: 'facebook',
              type: 'text',
              admin: {
                description: 'Facebook page URL',
              },
            },
            {
              name: 'youtube',
              type: 'text',
              admin: {
                description: 'YouTube channel URL',
              },
            },
          ],
        },
        {
          label: 'Hours',
          fields: [
            {
              name: 'hours',
              type: 'text',
              localized: true,
              defaultValue: 'Aberto 24/7',
            },
            {
              name: 'specialHours',
              type: 'richText',
              localized: true,
              admin: {
                description: 'Special hours or holidays',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'seoImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}