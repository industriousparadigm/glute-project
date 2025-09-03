# Analytics & Tracking Documentation

## Overview

The Glute Project website implements comprehensive analytics tracking to measure visitor engagement, conversion paths, and user behavior. This document outlines what we track and how to interpret the data.

## 1. Basic Visitor Tracking (Vercel Analytics)

### Automatic Tracking
- **Page Views**: Every page load is tracked
- **Unique Visitors**: Identified by anonymous session IDs
- **Geographic Data**: Country, region, city
- **Device Information**: Desktop/mobile, browser, OS
- **Traffic Sources**: Direct, search, social, referral
- **Performance Metrics**: Page load times, Core Web Vitals

### Access Dashboard
Visit: https://vercel.com/gluteproject/analytics

## 2. Custom Event Tracking

We track the following user interactions:

### Contact Actions
- `whatsapp_click`: When users click WhatsApp button
  - Properties: source (where clicked), language
- `call_click`: When users click call button
  - Properties: source, language
- `form_open`: When users expand the contact form
  - Properties: language
- `form_submit`: When contact form is successfully submitted
  - Properties: language

### Social Media Clicks
- `instagram_click`: Instagram profile link clicks
  - Properties: source (footer/instagram_section), language
- `facebook_click`: Facebook profile link clicks
  - Properties: source, language

### User Preferences
- `language_switch`: When users change language
  - Properties: from (previous language), to (new language)

### Navigation
- `map_directions_click`: When users click "Get directions"
  - Properties: language

### Engagement
- `pricing_view`: When pricing section comes into view
  - Properties: language

## 3. Conversion Tracking

### Key Conversion Paths to Monitor

1. **WhatsApp Conversion Path**
   - Landing → View Pricing → Click WhatsApp
   - Most common for mobile users
   - Track time between landing and WhatsApp click

2. **Call Conversion Path**
   - Landing → View Testimonials → Click Call
   - Common for users who want immediate contact

3. **Form Submission Path**
   - Landing → Open Form → Submit
   - Users who prefer written communication

## 4. Key Metrics to Track

### Daily Metrics
- Total visitors
- WhatsApp clicks
- Phone calls clicked
- Form submissions
- Language distribution (PT vs EN)

### Weekly Analysis
- Conversion rate: (WhatsApp + Calls + Forms) / Total Visitors
- Most popular contact method
- Peak visit times
- Mobile vs Desktop conversions

### Monthly Reports
- Traffic growth trend
- Conversion rate improvements
- Geographic distribution
- Language preference patterns

## 5. Implementation Details

### Adding New Event Tracking

```typescript
import { trackEvent } from '@/lib/analytics/track-event'

// Example: Track a new button click
<button onClick={() => trackEvent('button_name', { 
  source: 'section_name',
  language: locale,
  customProperty: 'value'
})}>
  Click Me
</button>
```

### Event Types Available
```typescript
export type EventName = 
  | 'whatsapp_click'
  | 'call_click'
  | 'instagram_click'
  | 'facebook_click'
  | 'form_submit'
  | 'form_open'
  | 'pricing_view'
  | 'language_switch'
  | 'map_directions_click'
```

## 6. Privacy & Compliance

- **Anonymous Tracking**: No personal data is collected
- **Cookie-Free**: Uses edge analytics without cookies
- **GDPR Compliant**: No consent required for anonymous analytics
- **Data Retention**: 90 days for Vercel Analytics

## 7. Advanced Tracking (Future)

### Google Analytics 4 (If Needed)
- Enhanced e-commerce tracking
- Custom audiences for remarketing
- More detailed user flow analysis

### Facebook Pixel (If Needed)
- Retargeting campaigns
- Lookalike audiences
- Conversion optimization

### Implementation Ready
The codebase is prepared for these additions:
```typescript
// In track-event.ts
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', eventName, properties)
}
```

## 8. Monitoring & Alerts

### Set Up Alerts For:
1. **Sudden traffic drops** (>50% decrease)
2. **Zero conversions** in 24 hours
3. **High bounce rate** (>80%)
4. **Page load time** >3 seconds

### Weekly Review Checklist
- [ ] Check total visitor count
- [ ] Review conversion rates
- [ ] Analyze traffic sources
- [ ] Check language distribution
- [ ] Review device breakdown
- [ ] Identify top performing content

## 9. A/B Testing Opportunities

### Test Ideas:
1. **CTA Button Colors**: Orange vs Lime
2. **WhatsApp vs Call**: Button order
3. **Form**: Hidden vs Always visible
4. **Language**: Auto-detect vs Manual selection
5. **Hero Text**: Different value propositions

## 10. ROI Calculation

### Metrics for ROI:
- Cost per visitor: Marketing spend / Total visitors
- Lead value: (WhatsApp + Calls + Forms) × Conversion rate
- Customer acquisition cost: Marketing spend / New members
- Lifetime value: Monthly fee × Average retention months

### Monthly ROI Report Should Include:
1. Total marketing spend
2. Total visitors
3. Total leads (all contact methods)
4. Conversion rate
5. New members acquired
6. ROI percentage

## Quick Start Commands

```bash
# View real-time analytics
Visit: https://vercel.com/dashboard/analytics

# Export data (from Vercel dashboard)
Analytics → Export → CSV

# Test event tracking in console
trackEvent('test_event', { test: true })
```

## Support

For analytics questions or to add new tracking:
1. Check this documentation
2. Review `/src/lib/analytics/track-event.ts`
3. Test in development first
4. Deploy and verify in production