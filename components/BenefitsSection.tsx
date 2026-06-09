'use client'

import { motion } from 'framer-motion'

export default function BenefitsSection() {
  const benefits = [
    {
      icon: '🌾',
      title: 'Real Ingredients Only',
      description: 'Made with wholesome ingredients like rolled oats, Greek yogurt, chia seeds, fruits, nuts, and natural sweeteners—nothing unnecessary.',
    },
    {
      icon: '🥣',
      title: 'Freshly Prepared',
      description: 'Every jar is prepared fresh in small batches to ensure quality, taste, and nutrition in every spoonful.',
    },
    {
      icon: '💚',
      title: 'Healthy Made Easy',
      description: 'A convenient breakfast packed with fiber, protein, and natural goodness to help fuel your busy day.',
    },
    {
      icon: '✨',
      title: 'Made with Care',
      description: 'At MISOHA, we focus on creating delicious and satisfying meals that support a healthier lifestyle without compromising on taste.',
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
    <section id="benefits" className="bg-white py-20 sm:py-32">
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
            Why MISOHA Stands Apart
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple, Honest, and Nutritious
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl bg-gradient-to-br from-amber-50 to-slate-50 p-8 transition-transform hover:scale-105"
            >
              <div className="mb-4 text-5xl">{benefit.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
