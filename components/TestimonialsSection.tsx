'use client'

import { motion } from 'framer-motion'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Coach',
      quote:
        'BlendBurst has transformed my morning routine. I have more energy, my digestion is better, and I finally feel fueled for the day ahead.',
      rating: 5,
      avatar: '👩‍🏫',
    },
    {
      name: 'Marcus Chen',
      role: 'Marathon Runner',
      quote:
        'As an athlete, nutrition is everything. BlendBurst provides the perfect balance of natural ingredients and convenience. Best pre-workout fuel ever.',
      rating: 5,
      avatar: '🏃',
    },
    {
      name: 'Emma Williams',
      role: 'Wellness Enthusiast',
      quote:
        'I&apos;ve tried everything for my health journey. BlendBurst is the only product that actually tastes amazing AND delivers on its promises. Obsessed.',
      rating: 5,
      avatar: '👩‍⚕️',
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
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-20 sm:py-32">
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
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real stories from real people who&apos;ve transformed their wellness
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-2xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
            >
              {/* Star Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-lg font-medium italic text-gray-700">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
