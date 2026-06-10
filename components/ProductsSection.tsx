'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductsSection() {
  const oats = [
  {
    id: '1',
    name: 'Strawberry Banana Bliss',
    description: 'A creamy blend of strawberries and bananas with oats, chia seeds, and honey for a naturally delicious breakfast.',
    price: '₹200',
    image: '/images/products/strawberry-oats.png',
    imageAlt: 'Strawberry Banana Bliss Overnight Oats',
    color: 'red',
    ingredients: ['Rolled Oats', 'Strawberry', 'Banana', 'Almond Milk','Greek Yogurt', 'Chia Seeds', 'Honey'],
  },
  {
    id: '2',
    name: 'Mango Coconut Paradise',
    description: 'A tropical combination of mango and coconut blended with creamy oats for a refreshing start to your day.',
    price: '₹200',
    image: '/images/products/mango-oats.png',
    imageAlt: 'Mango Coconut Paradise Overnight Oats',
    color: 'orange',
    ingredients: ['Rolled Oats', 'Mango', 'Coconut', 'Almond Milk', 'Greek Yogurt','Coconut Flakes', 'Almonds'],
  },
  {
    id: '3',
    name: 'Chocolate Peanut Butter Dream',
    description: 'A rich and creamy blend of chocolate and peanut butter, crafted for a satisfying and wholesome breakfast experience.',
    price: '₹200',
    image: '/images/products/chocolate-oats.png',
    imageAlt: 'Chocolate Peanut Butter Dream Overnight Oats',
    color: 'amber',
    ingredients: ['Rolled Oats', 'Cacao Powder', 'Peanut Butter', 'Almond Milk','Greek Yogurt', 'Honey', 'Walnuts'],
  },
  {
    id: '4',
    name: 'Blueberry Almond Crunch',
    description: 'A delicious blend of blueberries and almonds packed into creamy overnight oats with a satisfying crunch.',
    price: '₹200',
    image: '/images/products/blueberry-oats.png',
    imageAlt: 'Blueberry Almond Crunch Overnight Oats',
    color: 'purple',
    ingredients: ['Rolled Oats', 'Blueberry', 'Almond Butter', 'Almond Milk', 'Greek Yogurt','Almonds', 'Honey'],
  },
  {
    id: '5',
    name: 'Carrot Cake',
    description: 'Inspired by classic carrot cake, featuring carrots, cinnamon, walnuts, and raisins in creamy overnight oats.',
    price: '₹200',
    image: '/images/products/carrot-cake-oats.png',
    imageAlt: 'Carrot Cake Overnight Oats',
    color: 'orange',
    ingredients: [
      'Rolled Oats',
      'Almond Milk',
      'Greek Yogurt',
      'Chia Seeds',
      'Honey',
      'Vanilla Extract',
      'Grated Carrot',
      'Cinnamon',
      'Nutmeg',
      'Walnuts',
      'Raisins'
    ],
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
