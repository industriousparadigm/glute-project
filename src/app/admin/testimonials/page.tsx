'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  name: string
  text_pt: string
  text_en: string
  rating: number
  highlighted: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (testimonial: Testimonial) => {
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial),
      })
      if (res.ok) {
        await fetchTestimonials()
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error updating testimonial:', error)
    }
  }

  const handleCreate = async (formData: FormData) => {
    try {
      const testimonial = {
        name: formData.get('name') as string,
        text_pt: formData.get('text_pt') as string,
        text_en: formData.get('text_en') as string,
        rating: parseInt(formData.get('rating') as string),
        highlighted: formData.get('highlighted') === 'on',
      }
      
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial),
      })
      
      if (res.ok) {
        await fetchTestimonials()
        setIsAdding(false)
      }
    } catch (error) {
      console.error('Error creating testimonial:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await fetchTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Testimonials</h1>
          <p className="mt-2 text-gray-600">Customer reviews and feedback</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Add New Testimonial
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border-2 border-primary p-6">
          <h3 className="text-lg font-semibold mb-4">New Testimonial</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCreate(new FormData(e.currentTarget))
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial (PT)
                </label>
                <textarea
                  name="text_pt"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial (EN)
                </label>
                <textarea
                  name="text_en"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  name="rating"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  defaultValue="5"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="highlighted"
                  id="highlighted-new"
                  defaultChecked
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="highlighted-new" className="ml-2 block text-sm text-gray-700">
                  Show on homepage
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              testimonial.highlighted ? 'border-primary/30' : 'border-gray-200'
            } hover:shadow-md`}
          >
            <div className="p-6">
              {editingId === testimonial.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    handleUpdate({
                      ...testimonial,
                      name: formData.get('name') as string,
                      text_pt: formData.get('text_pt') as string,
                      text_en: formData.get('text_en') as string,
                      rating: parseInt(formData.get('rating') as string),
                      highlighted: formData.get('highlighted') === 'on',
                    })
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      name="name"
                      defaultValue={testimonial.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Testimonial (PT)
                      </label>
                      <textarea
                        name="text_pt"
                        defaultValue={testimonial.text_pt}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Testimonial (EN)
                      </label>
                      <textarea
                        name="text_en"
                        defaultValue={testimonial.text_en}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <select
                        name="rating"
                        defaultValue={testimonial.rating}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} Stars
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="highlighted"
                        id={`highlighted-${testimonial.id}`}
                        defaultChecked={testimonial.highlighted}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`highlighted-${testimonial.id}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Show on homepage
                      </label>
                    </div>
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
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating ? 'fill-current' : 'fill-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 italic mb-1">"{testimonial.text_pt}"</p>
                      <p className="text-gray-500 text-sm italic">"{testimonial.text_en}"</p>
                    </div>
                    {testimonial.highlighted && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full ml-4">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingId(testimonial.id)}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}