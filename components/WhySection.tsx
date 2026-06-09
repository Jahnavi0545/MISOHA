'use client'

import { motion } from 'framer-motion'

export default function WhySection() {
  const pillars = [
    {
      title: 'Mind',
      description: 'Nourish your thoughts with wholesome nutrition that fuels focus, clarity, and positive energy.',
      icon: '🧠',
    },
    {
      title: 'Soul',
      description: 'Enjoy food that satisfies your cravings while supporting your wellness journey—without guilt.',
      icon: '✨',
    },
    {
      title: 'Health',
      description: 'Made with real ingredients and balanced nutrition, MISOHA helps you build healthier habits one jar at a time.',
      icon: '💪',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="why" className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-balance text-4xl font-bold text-slate-900 sm:text-5xl">
            Why Choose MISOHA?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Three pillars of wellness for your complete nutrition journey
          </p>
        </motion.div>

        {/* Three Pillars - Mind, Soul, Health */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl bg-white p-8 shadow-md border-t-4 border-amber-600 transition-transform hover:shadow-lg hover:scale-105"
            >
              <div className="mb-4 text-5xl">{pillar.icon}</div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">## {pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="rounded-lg bg-slate-900 px-8 py-3 font-semibold text-white transition-transform hover:bg-amber-600 hover:scale-105">
            Order Fresh Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}
