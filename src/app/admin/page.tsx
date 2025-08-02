import Link from 'next/link'

export default function AdminDashboard() {
  const cards = [
    {
      href: '/admin/prices',
      icon: '💰',
      title: 'Pricing Plans',
      description: 'Manage membership prices and special offers',
      color: 'from-orange-400 to-orange-600',
    },
    {
      href: '/admin/testimonials',
      icon: '⭐',
      title: 'Testimonials',
      description: 'Customer reviews and success stories',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      href: '/admin/settings',
      icon: '⚙️',
      title: 'Site Settings',
      description: 'Contact info and general configuration',
      color: 'from-gray-600 to-gray-800',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Admin Panel</h1>
        <p className="mt-2 text-gray-600">Manage your Glute Project website content</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            <div className="p-6">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
              <div className="mt-4 flex items-center text-primary font-medium">
                Manage
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">3</div>
            <div className="text-gray-600">Active Plans</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-gray-600">Testimonials</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-gray-600">Access Hours</div>
          </div>
        </div>
      </div>
    </div>
  )
}