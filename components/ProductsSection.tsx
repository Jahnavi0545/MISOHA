'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductsSection() {
  const oats = [
    {
      id: '1',
      name: 'Strawberry Banana Bliss',
      description: 'Nourish your mind with fresh strawberries and bananas. Promotes mental clarity and emotional balance.',
      price: '₹200',
      image: '/images/products/strawberry-oats.png',
      imageAlt: 'Strawberry Banana Bliss Overnight Oats',
      color: 'red',
      ingredients: ['Oats', 'Strawberry', 'Banana', 'Almond Milk', 'Chia Seeds', 'Honey'],
      benefits: ['Mental Clarity', 'Mood Elevation', 'Heart Health', 'Natural Energy'],
    },
    {
      id: '2',
      name: 'Mango Coconut Paradise',
      description: 'Tropical wellness blend for spiritual renewal. Supports immune health and positive energy flow.',
      price: '₹200',
      image: '/images/products/mango-oats.png',
      imageAlt: 'Mango Coconut Paradise Overnight Oats',
      color: 'orange',
      ingredients: ['Oats', 'Mango', 'Coconut', 'Almond Milk', 'Coconut Flakes', 'Almonds'],
      benefits: ['Energy Flow', 'Immune Support', 'Spiritual Wellness', 'Digestive Health'],
    },
    {
      id: '3',
      name: 'Chocolate Peanut Butter Power',
      description: 'Fuel your body with rich chocolate and protein. Enhances focus and sustained physical strength.',
      price: '₹200',
      image: '/images/products/chocolate-oats.png',
      imageAlt: 'Chocolate Peanut Butter Power Overnight Oats',
      color: 'amber',
      ingredients: ['Oats', 'Cacao Powder', 'Peanut Butter', 'Almond Milk', 'Honey', 'Walnuts'],
      benefits: ['Mental Focus', 'Sustained Energy', 'Muscle Health', 'Brain Power'],
    },
    {
      id: '4',
      name: 'Blueberry Almond Crunch',
      description: 'Supercharge your wellness with antioxidant-rich blueberries. Supports brain health and mental acuity.',
      price: '₹200',
      image: '/images/products/blueberry-oats.png',
      imageAlt: 'Blueberry Almond Crunch Overnight Oats',
      color: 'purple',
      ingredients: ['Oats', 'Blueberry', 'Almond Butter', 'Almond Milk', 'Almonds', 'Honey'],
      benefits: ['Brain Health', 'Antioxidants', 'Mental Sharpness', 'Anti-inflammation'],
    },
   {
  id: '5',
  name: 'Carrot Cake',
  description: 'A cozy blend of carrots, cinnamon, and walnuts inspired by classic carrot cake. Naturally sweet, wholesome, and packed with comforting flavors.',
  price: '₹200',
  image: '/images/products/carrot-cake-oats.png',
  imageAlt: 'Carrot Cake Overnight Oats',
  color: 'orange',
  ingredients: [
    'Rolled Oats',
    'Almond Milk',
    'Greek Yogurt',
    'Chia Seeds',
    'Maple Syrup',
    'Vanilla Extract',
    'Grated Carrot',
    'Cinnamon',
    'Nutmeg',
    'Walnuts',
    'Raisins'
  ],
  benefits: [
    'Rich in Fiber',
    'Natural Energy',
    'Vitamin-Rich',
    'Wholesome Nutrition'
  ]
}
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
    <section id="products" className="bg-white py-20 sm:py-32">
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
            Wellness Oats for Mind, Soul & Body
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Five nutrient-rich flavors crafted for your holistic wellbeing. ₹200 per serving
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
          {oats.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
