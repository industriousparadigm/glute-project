# Instagram Feed Setup Guide

This guide explains how to set up the Instagram integration to display real posts from the @glute_project account.

## Prerequisites

- Access to the Glute Project Instagram account
- Access to the Facebook account that manages the Instagram account
- Admin access to the Vercel project

## Setup Steps

### 1. Create a Meta Developer App

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Click "My Apps" → "Create App"
3. Choose "Consumer" as the app type
4. Fill in the app details:
   - App Name: "Glute Project Website"
   - App Contact Email: (use admin email)
   - App Purpose: Select appropriate option

### 2. Add Instagram Basic Display

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Click "Create New App" under Instagram Basic Display
4. Fill in required fields:
   - Display Name: "Glute Project Website"
   - Valid OAuth Redirect URIs: `https://your-domain.com/api/instagram/callback`
   - Deauthorize Callback URL: `https://your-domain.com/api/instagram/deauth`
   - Data Deletion Request URL: `https://your-domain.com/api/instagram/delete`

### 3. Add Instagram Test User

1. In Instagram Basic Display settings, go to "Roles" → "Instagram Testers"
2. Click "Add Instagram Testers"
3. Enter the @glute_project username
4. The account owner needs to accept the invite:
   - Go to Instagram Settings → Apps and Websites
   - Accept the tester invite

### 4. Generate Access Token

1. In Instagram Basic Display → Basic Display tab
2. Click "Generate Token" next to the test user
3. Log in with the @glute_project account
4. Authorize the app
5. Copy the access token (this is temporary)

### 5. Get Long-Lived Token

Use this curl command with your temporary token:

```bash
curl -X GET \
  "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_LIVED_TOKEN"
```

This returns a long-lived token (valid for 60 days).

### 6. Get Instagram User ID

```bash
curl -X GET \
  "https://graph.instagram.com/me?fields=id,username&access_token=YOUR_LONG_LIVED_TOKEN"
```

### 7. Add Environment Variables to Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add these variables:

```
INSTAGRAM_APP_ID=your-app-id
INSTAGRAM_APP_SECRET=your-app-secret
INSTAGRAM_ACCESS_TOKEN=your-long-lived-token
INSTAGRAM_USER_ID=your-user-id
CRON_SECRET=generate-random-string
```

### 8. Redeploy

After adding the environment variables, trigger a new deployment for the changes to take effect.

## How It Works

1. **Fetching Posts**: The `/api/instagram/posts` endpoint fetches the latest posts from Instagram
2. **Caching**: Posts are cached for 1 hour to avoid hitting rate limits
3. **Token Refresh**: A Vercel cron job runs weekly to refresh the access token
4. **Fallback**: If the API fails or isn't configured, placeholder images are shown

## Maintenance

### Token Refresh

The Instagram access token expires every 60 days. The cron job automatically refreshes it weekly, but if it fails:

1. Check the logs at `/api/instagram/refresh`
2. Manually refresh by visiting: `https://your-domain.com/api/instagram/refresh?auth=Bearer YOUR_CRON_SECRET`
3. Update the `INSTAGRAM_ACCESS_TOKEN` in Vercel if needed

### Monitoring

- Check Vercel Functions logs for any API errors
- Monitor the cron job execution in Vercel dashboard
- Test the feed regularly to ensure it's working

## Troubleshooting

### Feed shows placeholder images

1. Check if environment variables are set in Vercel
2. Verify the access token is valid
3. Check Vercel function logs for errors

### Token refresh fails

1. Ensure the token hasn't already expired (must refresh before 60 days)
2. Verify INSTAGRAM_APP_SECRET is correct
3. Check if the Instagram account still has the app authorized

### Rate limits

Instagram Basic Display API limits:
- 200 requests per hour per user
- The caching mechanism helps stay within limits

## Going Live

Before going to production:

1. Submit your app for App Review (Instagram Basic Display)
2. Add the production domain to OAuth redirect URIs
3. Update the Instagram account from test mode to live mode
4. Test everything thoroughly

## Support

For issues with:
- Instagram API: Check [Instagram Basic Display API docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- Vercel deployment: Check [Vercel docs](https://vercel.com/docs)
- This implementation: Check the code in `/src/lib/instagram/` and `/src/app/api/instagram/`