# Required Environment Variables for Vercel

The following environment variables must be set in your Vercel project settings for the deployment to succeed:

## Database Configuration
- **DATABASE_URL** - PostgreSQL connection string (e.g., from Neon, Supabase, or Vercel Postgres)
  - Example: `postgres://user:password@host/database?sslmode=require`

## Authentication
- **JWT_SECRET** - Secret key for JWT token generation (use a strong, random string)
  - Example: Generate with `openssl rand -base64 32`
- **ADMIN_EMAIL** - Email address for admin login
  - Example: `admin@gluteproject.com`
- **ADMIN_PASSWORD** - Password for admin login (use a strong password)

## Payload CMS
- **PAYLOAD_SECRET** - Secret key for Payload CMS
  - Example: `glute-project-cms-secret-key-2025`

## Optional but Recommended
- **NEXT_PUBLIC_BASE_URL** - Your production URL
  - Example: `https://gluteproject.vercel.app`

## How to Add Environment Variables in Vercel

1. Go to your project dashboard in Vercel
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Make sure to select the appropriate environments (Production, Preview, Development)
5. Save and redeploy

## Notes
- Never commit actual environment variable values to the repository
- Use strong, unique values for all secret keys
- The database must be initialized with the schema before first use (run `npm run init-db` locally with the production DATABASE_URL)