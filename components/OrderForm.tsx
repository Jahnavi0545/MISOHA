'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'



interface FormData {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  subscriptionType: string
  deliveryDate: string
  instructions: string
  terms: boolean
}

interface Product {
  name: string
  category: 'oats' | 'shots'
  price: number
}

const ALL_PRODUCTS: Product[] = [
  { name: 'Strawberry Banana Bliss', category: 'oats', price: 200 },
  { name: 'Mango Coconut Paradise', category: 'oats', price: 200 },
  { name: 'Chocolate Peanut Butter Dream', category: 'oats', price: 200 },
  { name: 'Blueberry Almond Crunch', category: 'oats', price: 200 },
  { name: 'Carrot Cake', category: 'oats', price: 200 },
  { name: 'Amla Vital Shot', category: 'shots', price: 40 },
  { name: 'ABC Glow Shot', category: 'shots', price: 40 },
  { name: 'Immunity Boost Shot', category: 'shots', price: 40 },
]
const SUBSCRIPTIONS = [
  { id: 'one-time', label: 'One Time Order', description: 'Single order' },
  { id: 'weekly', label: 'Weekly Plan', description: '1 week recurring' },
  { id: '15days', label: '15 Days Plan', description: 'Every 15 days' },
  { id: 'monthly', label: 'Monthly Plan', description: '1 month recurring' },
]

export default function OrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>(
    ALL_PRODUCTS.reduce((acc, p) => ({ ...acc, [p.name]: 0 }), {} as Record<string, number>)
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      subscriptionType: 'one-time',
    },
  })

  const subscriptionType = watch('subscriptionType')

  useEffect(() => {
    const preselected = sessionStorage.getItem('preselectedProduct')
    if (preselected) {
      try {
        const { productName } = JSON.parse(preselected)
        if (ALL_PRODUCTS.some(p => p.name === productName)) {
          setQuantities(prev => ({ ...prev, [productName]: (prev[productName] || 0) + 1 }))
        }
      } catch {}
      sessionStorage.removeItem('preselectedProduct')
    }
  }, [])

  const handleQuantityChange = (productName: string, value: number) => {
    setQuantities(prev => ({ ...prev, [productName]: Math.max(0, Math.min(99, value)) }))
  }

  const calculateTotal = () => {
    return ALL_PRODUCTS.reduce(
      (total, product) => total + (quantities[product.name] || 0) * product.price,
      0
    )
  }

  const getOrderSummary = () => {
    return ALL_PRODUCTS
      .filter(p => (quantities[p.name] || 0) > 0)
      .map(p => `${p.name} × ${quantities[p.name]}`)
      .join(', ')
  }

  const getCategorySummary = (category: 'oats' | 'shots') => {
    return ALL_PRODUCTS
      .filter(p => p.category === category && (quantities[p.name] || 0) > 0)
      .map(p => `${p.name} × ${quantities[p.name]}`)
      .join(', ')
  }

  const getCategoryTotal = (category: 'oats' | 'shots') => {
    return ALL_PRODUCTS
      .filter(p => p.category === category)
      .reduce((sum, p) => sum + (quantities[p.name] || 0), 0)
  }

  const onSubmit = async (data: FormData) => {
    const totalPrice = calculateTotal()
    if (totalPrice === 0) {
      setSubmitMessage('⚠️ Please select at least one product to order.')
      return
    }

    try {
      const deliveryDate = new Date(data.deliveryDate)
      const now = new Date()

      const cutoffDate = new Date(deliveryDate)
      cutoffDate.setDate(cutoffDate.getDate() - 1)
      cutoffDate.setHours(21, 0, 0, 0)

      if (now > cutoffDate) {
        setSubmitMessage('⚠️ Orders must be placed before 9:00 PM on the previous day.')
        return
      }

      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          oatsSelection: getCategorySummary('oats'),
          oatsQuantity: getCategoryTotal('oats'),
          shotsSelection: getCategorySummary('shots'),
          shotsQuantity: getCategoryTotal('shots'),
          items: getOrderSummary(),
          totalPrice,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitMessage('✅ Order received! Check your email for confirmation.')
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setSubmitMessage('')
        }, 3000)
      } else {
        setSubmitMessage('❌ Error submitting order. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('❌ Error submitting order. Please try again.')
    }
  }

  return (
    <section id="order" className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-balance text-4xl font-bold text-gray-900 sm:text-5xl">
            Place Your Order
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Order by 9 pm for next-day fresh delivery to your door
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl bg-white p-8 shadow-lg"
        >
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Name is required' })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="Your name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
  type="tel"
  autoComplete="tel"
  inputMode="numeric"
  maxLength={10}
  {...register('phone', {
    required: 'Phone is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Phone number must be exactly 10 digits'
    }
  })}
  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
  placeholder="10-digit phone number"
/>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
  type="email"
  autoComplete="email"
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Please enter a valid email address'
    }
  })}
  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
  placeholder="your@email.com"
/>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address *</label>
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                placeholder="Street address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">City *</label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="City"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">State *</label>
                <input
                  type="text"
                  {...register('state', { required: 'State is required' })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="State"
                />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
                <input
                  type="text"
                  {...register('postalCode', { required: 'Postal code is required' })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  placeholder="PIN code"
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>}
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Products</h3>
            <p className="text-sm text-gray-500">Set quantity for each item you want to order (0 = skip)</p>

            <div>
              <h4 className="text-md mb-3 font-medium text-gray-700">Wellness Oats (₹200 each)</h4>
              <div className="space-y-2">
                {ALL_PRODUCTS.filter(p => p.category === 'oats').map(product => (
                  <div key={product.name} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <span className="text-sm text-gray-900">{product.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.name, (quantities[product.name] || 0) - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-900">{quantities[product.name] || 0}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.name, (quantities[product.name] || 0) + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-md mb-3 mt-6 font-medium text-gray-700">Wellness Shots (₹40 each)</h4>
              <div className="space-y-2">
                {ALL_PRODUCTS.filter(p => p.category === 'shots').map(product => (
                  <div key={product.name} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <span className="text-sm text-gray-900">{product.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.name, (quantities[product.name] || 0) - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-900">{quantities[product.name] || 0}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.name, (quantities[product.name] || 0) + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Estimated Total</span>
                <span className="text-2xl font-bold text-amber-600">₹{calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Subscription Plan</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SUBSCRIPTIONS.map((sub) => (
                <label key={sub.id} className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 cursor-pointer hover:border-amber-600 hover:bg-amber-50">
                  <input
                    type="radio"
                    value={sub.id}
                    {...register('subscriptionType')}
                    className="h-4 w-4 text-amber-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{sub.label}</p>
                    <p className="text-sm text-gray-600">{sub.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Date *</label>
            <input
              type="date"
              {...register('deliveryDate', { required: 'Delivery date is required' })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
            <p className="mt-1 text-xs text-gray-500">Order by 9 pm for next-day delivery</p>
            {errors.deliveryDate && <p className="mt-1 text-sm text-red-600">{errors.deliveryDate.message}</p>}
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
            <textarea
              {...register('instructions')}
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
              placeholder="Any dietary preferences or allergies?"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('terms', { required: 'You must agree to terms' })}
              className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-teal-500"
            />
            <label className="text-sm text-gray-700">
              I agree to MISOHA's terms and conditions *
            </label>
          </div>
          {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}

          {/* Submit Message */}
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-800"
            >
              {submitMessage}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Place Order'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
