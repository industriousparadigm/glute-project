import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { query } from '@/lib/db/client'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Calendar, CreditCard, FileText, ExternalLink } from 'lucide-react'
import { DashboardHeader } from '@/components/online/DashboardHeader'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const user = await currentUser()

  if (!user) {
    redirect(`/${locale}/online/sign-in`)
  }

  // Get user data from database
  const userResult = await query(
    'SELECT id, stripe_customer_id FROM online_users WHERE clerk_user_id = $1',
    [user.id]
  )

  if (userResult.rows.length === 0) {
    return (
      <div className="min-h-screen bg-brand-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4">
            {locale === 'pt' ? 'A configurar a tua conta...' : 'Setting up your account...'}
          </h1>
          <p className="text-gray-400">
            {locale === 'pt'
              ? 'Por favor aguarda alguns segundos e atualiza a página'
              : 'Please wait a few seconds and refresh the page'}
          </p>
        </div>
      </div>
    )
  }

  const dbUser = userResult.rows[0]

  // Get active subscription
  const subResult = await query(
    `SELECT s.*, p.name_${locale} as package_name, p.price_monthly, p.features_${locale} as features
     FROM user_subscriptions s
     JOIN online_packages p ON s.package_id = p.id
     WHERE s.user_id = $1 AND s.status IN ('active', 'trialing')
     ORDER BY s.created_at DESC
     LIMIT 1`,
    [dbUser.id]
  )

  const subscription = subResult.rows[0] || null

  // Get payment history
  const paymentsResult = await query(
    `SELECT amount, currency, status, payment_method, created_at
     FROM payments
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 5`,
    [dbUser.id]
  )

  const payments = paymentsResult.rows

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <DashboardHeader locale={locale} />

      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="font-display text-4xl uppercase mb-4">
            {locale === 'pt' ? 'OLÁ' : 'HELLO'}, {user.firstName || user.emailAddresses[0].emailAddress}
          </h2>
          <p className="text-gray-400">
            {locale === 'pt'
              ? 'Gere a tua subscrição e acede aos teus treinos'
              : 'Manage your subscription and access your workouts'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Subscription */}
          <div className="bg-gradient-studio p-8 border border-accent-orange/20">
            <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-accent-orange" />
              {locale === 'pt' ? 'SUBSCRIÇÃO ATIVA' : 'ACTIVE SUBSCRIPTION'}
            </h3>

            {subscription ? (
              <>
                <div className="mb-6">
                  <div className="text-3xl font-display mb-2">{subscription.package_name}</div>
                  <div className="text-accent-lime text-2xl">€{subscription.price_monthly}/mês</div>
                  <div className="mt-4 text-sm text-gray-400">
                    {locale === 'pt' ? 'Status:' : 'Status:'}{' '}
                    <span className="text-accent-lime capitalize">{subscription.status}</span>
                  </div>
                  {subscription.current_period_end && (
                    <div className="text-sm text-gray-400">
                      {locale === 'pt' ? 'Renova em:' : 'Renews on:'}{' '}
                      {new Date(subscription.current_period_end).toLocaleDateString(
                        locale === 'pt' ? 'pt-PT' : 'en-US'
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {subscription.features &&
                    JSON.parse(subscription.features).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent-lime"></div>
                        {feature}
                      </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-accent-orange/20">
                  <form action="/api/stripe/create-portal-session" method="POST">
                    <input type="hidden" name="customerId" value={dbUser.stripe_customer_id} />
                    <Button variant="outline" fullWidth type="submit">
                      {locale === 'pt' ? 'Gerir Subscrição' : 'Manage Subscription'}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-6">
                  {locale === 'pt'
                    ? 'Ainda não tens uma subscrição ativa'
                    : "You don't have an active subscription"}
                </p>
                <Link href={`/${locale}/online`}>
                  <Button variant="primary">
                    {locale === 'pt' ? 'Ver Pacotes' : 'View Packages'}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            {/* Regybox App */}
            <div className="bg-gradient-services p-8 border border-accent-orange/20">
              <h3 className="font-display text-2xl uppercase mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-accent-orange" />
                {locale === 'pt' ? 'TREINOS' : 'WORKOUTS'}
              </h3>
              <p className="text-gray-600 mb-6">
                {locale === 'pt'
                  ? 'Acede aos teus treinos personalizados na app Regybox'
                  : 'Access your personalized workouts in the Regybox app'}
              </p>
              <a href="https://app.regybox.com" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" fullWidth icon={<ExternalLink />} iconPosition="right">
                  {locale === 'pt' ? 'Abrir Regybox' : 'Open Regybox'}
                </Button>
              </a>
            </div>

            {/* Payment History */}
            <div className="bg-gradient-testimonials p-8 border border-accent-orange/20">
              <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-accent-orange" />
                {locale === 'pt' ? 'HISTÓRICO' : 'HISTORY'}
              </h3>

              {payments.length > 0 ? (
                <div className="space-y-3">
                  {payments.map((payment, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center pb-3 border-b border-accent-orange/10 last:border-0"
                    >
                      <div className="text-sm">
                        <div className="font-medium">€{payment.amount}</div>
                        <div className="text-gray-400 text-xs">
                          {new Date(payment.created_at).toLocaleDateString(
                            locale === 'pt' ? 'pt-PT' : 'en-US'
                          )}
                        </div>
                      </div>
                      <div className="text-accent-lime text-xs capitalize">{payment.status}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  {locale === 'pt' ? 'Sem pagamentos ainda' : 'No payments yet'}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
