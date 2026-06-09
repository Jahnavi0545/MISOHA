'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function WellnessSection() {
  const shots = [
    {
      id: 'w1',
      name: 'Amla Shot',
      description: 'Indian superfruit for immune strength and mental clarity. Rich in vitamin C for holistic health.',
      price: '₹40',
      image: '/images/products/amla-shot.png',
      imageAlt: 'Amla Wellness Shot',
      color: 'amber',
      ingredients: ['Amla', 'Honey', 'Water'],
      benefits: ['Immune Power', 'Mental Clarity', 'Vitamin C Boost', 'Energy Flow'],
    },
    {
      id: 'w2',
      name: 'ABC Shot',
      description: 'Apple, Beet, Carrot blend for vital energy. Cleanses the mind and body naturally.',
      price: '₹40',
      image: '/images/products/abc-shot.png',
      imageAlt: 'ABC Wellness Shot',
      color: 'red',
      ingredients: ['Apple', 'Beet', 'Carrot', 'Ginger', 'Lemon'],
      benefits: ['Vital Energy', 'Natural Cleanse', 'Body Purification', 'Mental Refresh'],
    },
    {
      id: 'w3',
      name: 'Turmeric Shot',
      description: 'Golden turmeric with black pepper for anti-inflammatory wellness. Supports spiritual and physical health.',
      price: '₹40',
      image: '/images/products/turmeric-shot.png',
      imageAlt: 'Turmeric Wellness Shot',
      color: 'orange',
      ingredients: ['Turmeric', 'Black Pepper', 'Ginger', 'Honey', 'Water'],
      benefits: ['Anti-inflammatory', 'Spiritual Wellness', 'Joint Health', 'Golden Health'],
    },
    {
      id: 'w4',
      name: 'Ginger Lemon Shot',
      description: 'Warming ginger and fresh lemon to ignite digestion and mental alertness.',
      price: '₹40',
      image: '/images/products/ginger-lemon-shot.png',
      imageAlt: 'Ginger Lemon Wellness Shot',
      color: 'yellow',
      ingredients: ['Ginger', 'Lemon', 'Raw Honey', 'Water'],
      benefits: ['Digestive Fire', 'Mental Alertness', 'Immune Boost', 'Vitality'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-balance text-4xl font-bold text-gray-900 sm:text-5xl">
            Wellness Shots
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Concentrated wellness boosters for mind, soul & body. ₹40 per shot
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {shots.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
