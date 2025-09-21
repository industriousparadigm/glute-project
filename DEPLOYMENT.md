# Deployment Guide 🚀

## Prerequisites

Before deploying, ensure you have:

1. **PostgreSQL Database** (Neon recommended)
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new database
   - Copy the connection string

2. **Environment Variables**
   - Generate JWT secret: `openssl rand -base64 32`
   - Set admin credentials
   - Choose a secure password

## Vercel Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy to production**
   ```bash
   vercel --prod
   ```

3. **Set environment variables**
   ```bash
   # Set each variable
   vercel env add DATABASE_URL production
   vercel env add JWT_SECRET production
   vercel env add ADMIN_EMAIL production
   vercel env add ADMIN_PASSWORD production
   vercel env add NEXT_PUBLIC_BASE_URL production
   vercel env add PAYLOAD_SECRET production
   ```

### Option 2: Deploy via GitHub Integration

1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Configure environment variables in the UI:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `JWT_SECRET` - Generated secret key
   - `ADMIN_EMAIL` - Admin login email
   - `ADMIN_PASSWORD` - Admin login password
   - `NEXT_PUBLIC_BASE_URL` - Your production URL (e.g., https://gluteproject.vercel.app)
   - `PAYLOAD_SECRET` - Another generated secret key

5. Click "Deploy"

## Post-Deployment

1. **Run database migrations**
   - SSH into your database or use Neon's query editor
   - Run the migration from `scripts/init-db.js`

2. **Test the deployment**
   - Visit your production URL
   - Check all pages load correctly
   - Test language switching
   - Login to admin panel at `/admin`

3. **Monitor performance**
   - Check Vercel Analytics dashboard
   - Verify Core Web Vitals scores
   - Test on mobile devices

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secret for JWT tokens | `your-32-char-secret` |
| `ADMIN_EMAIL` | Admin login email | `geral@gluteproject.pt` |
| `ADMIN_PASSWORD` | Admin login password | `SecurePassword123!` |
| `NEXT_PUBLIC_BASE_URL` | Production URL | `https://gluteproject.vercel.app` |
| `PAYLOAD_SECRET` | Payload CMS secret | `another-32-char-secret` |

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Ensure Node.js version matches (20.18.0+)
- Review build logs in Vercel dashboard

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check SSL mode is enabled (`?sslmode=require`)
- Ensure database is accessible from Vercel's IPs

### Admin Login Issues
- Verify ADMIN_EMAIL and ADMIN_PASSWORD match
- Check JWT_SECRET is set correctly
- Clear browser cookies and try again

## Custom Domain

To add a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain (e.g., gluteproject.pt)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

---

For support, check the [Vercel documentation](https://vercel.com/docs) or open an issue in the repository.