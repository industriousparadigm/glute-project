import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-ink font-display text-4xl font-bold uppercase mb-8">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/prices" className="bg-white p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-ink font-display text-2xl font-bold uppercase mb-2">
            Preços
          </h2>
          <p className="text-ink/60">
            Gerir planos e preços
          </p>
        </Link>
        
        <Link href="/admin/testimonials" className="bg-white p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-ink font-display text-2xl font-bold uppercase mb-2">
            Testemunhos
          </h2>
          <p className="text-ink/60">
            Gerir testemunhos de membros
          </p>
        </Link>
        
        <Link href="/admin/settings" className="bg-white p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-ink font-display text-2xl font-bold uppercase mb-2">
            Configurações
          </h2>
          <p className="text-ink/60">
            Informações do site
          </p>
        </Link>
      </div>
    </div>
  )
}