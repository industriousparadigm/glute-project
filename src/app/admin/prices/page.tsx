'use client'

import { useState, useEffect } from 'react'

interface Price {
  id: number
  key: string
  title_pt: string
  title_en: string
  price_pt: string
  price_en: string
  description_pt: string
  description_en: string
  highlighted: boolean
}

export default function PricesPage() {
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      const res = await fetch('/api/admin/prices')
      if (res.ok) {
        const data = await res.json()
        setPrices(data)
      }
    } catch (error) {
      console.error('Error fetching prices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (price: Price) => {
    try {
      const res = await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(price),
      })
      if (res.ok) {
        await fetchPrices()
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error updating price:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Prices</h1>
        <p className="mt-2 text-gray-600">Update your pricing plans and descriptions</p>
      </div>

      <div className="grid gap-6">
        {prices.map((price) => (
          <div
            key={price.id}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              price.highlighted ? 'border-primary shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="p-6">
              {editingId === price.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    handleUpdate({
                      ...price,
                      title_pt: formData.get('title_pt') as string,
                      title_en: formData.get('title_en') as string,
                      price_pt: formData.get('price_pt') as string,
                      price_en: formData.get('price_en') as string,
                      description_pt: formData.get('description_pt') as string,
                      description_en: formData.get('description_en') as string,
                      highlighted: formData.get('highlighted') === 'on',
                    })
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title (PT)
                      </label>
                      <input
                        name="title_pt"
                        defaultValue={price.title_pt}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title (EN)
                      </label>
                      <input
                        name="title_en"
                        defaultValue={price.title_en}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (PT)
                      </label>
                      <input
                        name="price_pt"
                        defaultValue={price.price_pt}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (EN)
                      </label>
                      <input
                        name="price_en"
                        defaultValue={price.price_en}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (PT)
                      </label>
                      <input
                        name="description_pt"
                        defaultValue={price.description_pt}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (EN)
                      </label>
                      <input
                        name="description_en"
                        defaultValue={price.description_en}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="highlighted"
                      id={`highlighted-${price.id}`}
                      defaultChecked={price.highlighted}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`highlighted-${price.id}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Highlight this plan
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {price.title_pt} / {price.title_en}
                      </h3>
                      <p className="text-2xl font-bold text-primary mt-2">
                        {price.price_pt} / {price.price_en}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {price.description_pt} / {price.description_en}
                      </p>
                    </div>
                    {price.highlighted && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setEditingId(price.id)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}