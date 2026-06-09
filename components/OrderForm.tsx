'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'



interface FormData {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  oatsSelection: string
  oatsQuantity: number
  shotsSelection: string
  shotsQuantity: number
  subscriptionType: string
  deliveryDate: string
  instructions: string
  terms: boolean
}

const OATS = ['Strawberry Banana Bliss', 'Mango Coconut Paradise', 'Chocolate Peanut Butter Power', 'Blueberry Almond Crunch', 'Apple Cinnamon']
const SHOTS = ['Amla Shot', 'ABC Shot', 'Turmeric Shot', 'Ginger Lemon Shot']
const SUBSCRIPTIONS = [
  { id: 'one-time', label: 'One Time Order', description: 'Single order' },
  { id: 'weekly', label: 'Weekly Plan', description: '1 week recurring' },
  { id: '15days', label: '15 Days Plan', description: 'Every 15 days' },
  { id: 'monthly', label: 'Monthly Plan', description: '1 month recurring' },
]

export default function OrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      subscriptionType: 'one-time',
      oatsQuantity: 1,
      shotsQuantity: 1,
    },
  })

  const subscriptionType = watch('subscriptionType')

  const onSubmit = async (data: FormData) => {
    try {
    // Customer must order before 9 PM on the previous day
const deliveryDate = new Date(data.deliveryDate)
const now = new Date()

const cutoffDate = new Date(deliveryDate)
cutoffDate.setDate(cutoffDate.getDate() - 1)
cutoffDate.setHours(21, 0, 0, 0) // 9:00 PM

if (now > cutoffDate) {
  setSubmitMessage(
    '⚠️ Orders must be placed before 9:00 PM on the previous day.'
  )
  return
}

      // Send to Google Sheets via API
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          totalPrice: calculateTotal(data),
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

  const calculateTotal = (data: FormData) => {
    const oatsPrice = data.oatsQuantity * 200
    const shotsPrice = data.shotsQuantity * 40
    return oatsPrice + shotsPrice
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
            Order by 9 AM for next-day fresh delivery to your door
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Oats Flavor *</label>
                <select
                  {...register('oatsSelection', { required: 'Select an oats flavor' })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">Choose flavor...</option>
                  {OATS.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor} - ₹200
                    </option>
                  ))}
                </select>
                {errors.oatsSelection && <p className="mt-1 text-sm text-red-600">{errors.oatsSelection.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Oats Quantity *</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register('oatsQuantity', { required: 'Quantity is required', min: 1 })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
                {errors.oatsQuantity && <p className="mt-1 text-sm text-red-600">{errors.oatsQuantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Wellness Shot</label>
                <select
                  {...register('shotsSelection')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">No shot</option>
                  {SHOTS.map((shot) => (
                    <option key={shot} value={shot}>
                      {shot} - ₹40
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Shot Quantity</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  {...register('shotsQuantity')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
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
            <p className="mt-1 text-xs text-gray-500">Order by 9 AM for next-day delivery</p>
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
