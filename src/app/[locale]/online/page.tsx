import { query } from '@/lib/db/client'
import { OnlinePageClient } from './OnlinePageClient'

export default async function OnlinePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Fetch packages from database
  const result = await query(
    `SELECT id, name_${locale} as name, price_monthly, features_${locale} as features, stripe_price_id, is_popular
     FROM online_packages
     WHERE active = true
     ORDER BY price_monthly ASC`
  )

  const packages = result.rows.map((row) => ({
    id: row.id.toString(),
    name: row.name,
    price: `€${row.price_monthly}`,
    features: row.features || [],
    stripePriceId: row.stripe_price_id,
    isPopular: row.is_popular,
  }))

  return <OnlinePageClient locale={locale} packages={packages} />
}
