'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function WellnessSection() {
  const shots = [
  {
    id: 'w1',
    name: 'Amla Vital Shot',
    description: 'A powerful blend of amla, ginger, Honey, black pepper, and curry leaves crafted to support immunity and daily wellness.',
    price: '₹40',
    image: '/images/products/amla-shot.png',
    imageAlt: 'Amla Vital Shot',
    color: 'amber',
    ingredients: ['Amla', 'Ginger', 'Honey', 'Black Pepper', 'Curry Leaves'],
    benefits: ['Immunity Boost', 'Vitamin C Rich', 'Natural Energy', 'Daily Wellness'],
  },

  {
    id: 'w2',
    name: 'ABC Glow Shot',
    description: 'A nourishing blend of apple, beetroot, and carrot packed with essential nutrients for vitality and natural radiance.',
    price: '₹40',
    image: '/images/products/abc-shot.png',
    imageAlt: 'ABC Glow Shot',
    color: 'red',
    ingredients: ['Apple', 'Beetroot', 'Carrot'],
    benefits: ['Natural Glow', 'Nutrient Rich', 'Daily Vitality', 'Natural Detox'],
  },

  {
    id: 'w4',
    name: 'Immunity Boost Shot',
    description: 'A refreshing mix of orange, pineapple, amla, ginger, and raw turmeric designed to strengthen immunity naturally.',
    price: '₹40',
    image: '/images/products/ginger-lemon-shot.png',
    imageAlt: 'Immunity Boost Shot',
    color: 'yellow',
    ingredients: ['Orange', 'Pineapple', 'Amla', 'Ginger', 'Raw Turmeric'],
    benefits: ['Immune Support', 'Antioxidant Rich', 'Anti-Inflammatory', 'Natural Refreshment'],
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
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
