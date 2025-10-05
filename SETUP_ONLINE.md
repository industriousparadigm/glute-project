# Glute Online - Clerk + Stripe Setup Guide

## ✅ What's Been Built

### 1. **Database Schema** (`src/lib/db/schema.sql`)
- `online_users` - Stores Clerk users + Stripe customer mapping
- `online_packages` - Subscription packages (Starter €49, Pro €89, Elite €149)
- `user_subscriptions` - Active subscriptions
- `payments` - Payment history

### 2. **Authentication (Clerk)**
- Sign-up/Sign-in flows
- Protected dashboard route
- User sync webhook
- Automatic Stripe customer creation

### 3. **Payments (Stripe)**
- Checkout flow for subscriptions
- Customer portal for billing management
- Payment webhooks (subscription created, updated, canceled)
- Payment history tracking

### 4. **Pages Created**
- `/[locale]/online` - Landing page with packages
- `/[locale]/online/dashboard` - User dashboard (protected)
- Clerk sign-in/sign-up pages (auto-generated)

---

## 🚀 Setup Instructions

### Step 1: Create Clerk Account

1. Go to https://dashboard.clerk.com
2. Click **"Create Application"**
3. Name: "Glute Online"
4. Enable: **Email** (required)
5. Optional: Add **Google** OAuth for easier sign-up

### Step 2: Get Clerk API Keys

In Clerk Dashboard → **API Keys**:

```bash
# Copy these to your .env.local:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### Step 3: Configure Clerk Webhooks

1. In Clerk Dashboard → **Webhooks** → **Add Endpoint**
2. URL: `https://your-domain.com/api/webhooks/clerk`
   - For local testing: Use [ngrok](https://ngrok.com) to expose localhost
3. Subscribe to events:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
4. Copy the **Signing Secret**:
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_xxx
   ```

### Step 4: Create Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Create account (use **Test Mode** for development)
3. Complete business details

### Step 5: Get Stripe API Keys

In Stripe Dashboard → **Developers** → **API Keys**:

```bash
# Copy these to your .env.local:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

### Step 6: Create Stripe Products & Prices

In Stripe Dashboard → **Products** → **Add Product**:

#### Product 1: STARTER
- Name: `STARTER`
- Price: €49.00 / month (recurring)
- After creating, copy the **Price ID** (starts with `price_xxx`)

#### Product 2: PRO
- Name: `PRO`
- Price: €89.00 / month (recurring)
- Copy the **Price ID**

#### Product 3: ELITE
- Name: `ELITE`
- Price: €149.00 / month (recurring)
- Copy the **Price ID**

### Step 7: Update Database with Stripe Price IDs

Run SQL in your Neon database:

```sql
-- Update packages with Stripe price IDs
UPDATE online_packages SET stripe_price_id = 'price_xxx_starter' WHERE name_pt = 'STARTER';
UPDATE online_packages SET stripe_price_id = 'price_xxx_pro' WHERE name_pt = 'PRO';
UPDATE online_packages SET stripe_price_id = 'price_xxx_elite' WHERE name_pt = 'ELITE';
```

### Step 8: Configure Stripe Webhooks

1. In Stripe Dashboard → **Developers** → **Webhooks** → **Add Endpoint**
2. URL: `https://your-domain.com/api/webhooks/stripe`
   - For local testing: Use Stripe CLI: `stripe listen --forward-to localhost:3002/api/webhooks/stripe`
3. Listen to events:
   - ✅ `checkout.session.completed`
   - ✅ `invoice.payment_succeeded`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
4. Copy the **Webhook Secret**:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

### Step 9: Enable Stripe Customer Portal

In Stripe Dashboard → **Settings** → **Billing** → **Customer Portal**:

1. Click **"Activate test link"**
2. Configure what customers can do:
   - ✅ Update payment method
   - ✅ View invoices
   - ✅ Cancel subscription
   - ⚠️ **Do NOT** enable changing plans (handle via your app)

### Step 10: Run Database Migration

```bash
npm run init-db
```

This creates all the tables including the new `online_*` tables.

---

## 📝 Final .env.local Checklist

Your `.env.local` should have:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Optional: Production URL (for Stripe redirects)
NEXT_PUBLIC_BASE_URL=https://gluteproject.pt
```

---

## 🧪 Testing the Flow

### 1. Test Sign-Up
1. Go to `http://localhost:3002/pt/online`
2. Click **"COMEÇAR AGORA"**
3. Create account with email
4. Check Clerk webhook logs: User should be created in database
5. Check Neon: Verify `online_users` has new row with `stripe_customer_id`

### 2. Test Checkout
1. While signed in, click **"ESCOLHER PLANO"** on any package
2. Should redirect to Stripe Checkout
3. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
4. Complete payment
5. Should redirect to `/online/dashboard`
6. Check Stripe webhook logs: Subscription should be created
7. Check database: `user_subscriptions` should have new row

### 3. Test Dashboard
1. Go to `/pt/online/dashboard`
2. Should see:
   - Active subscription
   - Features list
   - Payment history
   - "Gerir Subscrição" button

### 4. Test Customer Portal
1. In dashboard, click **"Gerir Subscrição"**
2. Should open Stripe Customer Portal
3. Try updating payment method
4. Try canceling subscription
5. Check webhook logs: Updates should sync to database

---

## 🔧 Local Development with Webhooks

### Option 1: Ngrok (Easier)
```bash
# Install ngrok
brew install ngrok  # or download from ngrok.com

# Expose local server
ngrok http 3002

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Use this in Clerk & Stripe webhook configs:
# https://abc123.ngrok.io/api/webhooks/clerk
# https://abc123.ngrok.io/api/webhooks/stripe
```

### Option 2: Stripe CLI (for Stripe only)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3002/api/webhooks/stripe

# Copy the webhook signing secret to .env.local
```

---

## 🎨 Customization

### Update Package Features
Edit `src/lib/db/schema.sql` or update via SQL:

```sql
UPDATE online_packages
SET features_pt = '["Feature 1", "Feature 2", "Feature 3"]'::jsonb
WHERE name_pt = 'PRO';
```

### Add More Packages
```sql
INSERT INTO online_packages (name_pt, name_en, price_monthly, features_pt, features_en, stripe_price_id)
VALUES (
  'CUSTOM', 'CUSTOM',
  199.00,
  '["Feature 1", "Feature 2"]'::jsonb,
  '["Feature 1", "Feature 2"]'::jsonb,
  'price_xxx'
);
```

---

## 📊 Database Queries

### View All Users
```sql
SELECT u.*, s.status, p.name_pt as package
FROM online_users u
LEFT JOIN user_subscriptions s ON u.id = s.user_id
LEFT JOIN online_packages p ON s.package_id = p.id;
```

### View Active Subscriptions
```sql
SELECT u.email, p.name_pt, s.status, s.current_period_end
FROM user_subscriptions s
JOIN online_users u ON s.user_id = u.id
JOIN online_packages p ON s.package_id = p.id
WHERE s.status = 'active';
```

### View Payment History
```sql
SELECT u.email, pm.amount, pm.status, pm.created_at
FROM payments pm
JOIN online_users u ON pm.user_id = u.id
ORDER BY pm.created_at DESC;
```

---

## 🚨 Troubleshooting

### Users Created but Not in Database
- Check Clerk webhook logs in Clerk Dashboard
- Verify webhook URL is correct and accessible
- Check server logs for errors in `/api/webhooks/clerk`

### Checkout Not Working
- Verify Stripe publishable key is correct
- Check browser console for errors
- Verify package has `stripe_price_id` in database
- Check if user has `stripe_customer_id` in `online_users`

### Webhooks Not Firing
- For Clerk: Check webhook endpoint URL and signing secret
- For Stripe: Use Stripe CLI to test locally
- Check webhook event subscriptions are enabled

### Dashboard Not Loading Subscription
- Check `user_subscriptions` table for user's row
- Verify `status` is 'active' or 'trialing'
- Check Stripe webhook logs for subscription creation

---

## 🎉 You're Ready!

The entire Clerk + Stripe integration is complete:
- ✅ User authentication (Clerk)
- ✅ Subscription checkout (Stripe)
- ✅ Protected dashboard
- ✅ Customer portal
- ✅ Webhook automation
- ✅ Database syncing

**Next Steps:**
1. Get API keys from Clerk & Stripe
2. Update `.env.local`
3. Run `npm run init-db`
4. Test the flow end-to-end
5. Deploy to production when ready! 🚀

---

## 💡 Production Checklist

Before going live:
- [ ] Switch Stripe to **Live Mode** (get live API keys)
- [ ] Switch Clerk to **Production** (get production keys)
- [ ] Update webhook URLs to production domain
- [ ] Set `NEXT_PUBLIC_BASE_URL` to production URL
- [ ] Test webhooks in production
- [ ] Set up Stripe tax collection (if required in EU)
- [ ] Configure email notifications (Clerk + Stripe)
- [ ] Add privacy policy & terms of service
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
