import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Collections
import { SiteSettings } from './cms/collections/SiteSettings'
import { Posts } from './cms/collections/Posts'
import { Testimonials } from './cms/collections/Testimonials'
import { Prices } from './cms/collections/Prices'
import { Media } from './cms/collections/Media'
import { Users } from './cms/collections/Users'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  collections: [
    Users,
    Media,
    Posts,
    Testimonials,
    Prices,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - Glute Project CMS',
    },
  },
  localization: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { pt: { label: 'Português' }, en: { label: 'English' } },
  },
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})