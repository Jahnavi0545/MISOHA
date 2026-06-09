'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
  {
    question: 'How do I place an order?',
    answer:
      'Choose your favorite flavor and place your order through our website or contact us directly. Orders must be placed before 9:00 PM for next-day preparation.',
  },
  {
    question: 'Why do I need to order before 9:00 PM?',
    answer:
      'Our overnight oats are prepared fresh and left to soak overnight. Ordering before 9:00 PM ensures your jar is ready the next day with the perfect taste and texture.',
  },
  {
    question: 'What ingredients do you use?',
    answer:
      'We use rolled oats, Greek yogurt, almond milk, chia seeds, fresh fruits, nuts, and natural sweeteners to create wholesome and delicious overnight oats.',
  },
  {
    question: 'How should I store my overnight oats?',
    answer:
      'Keep your oats refrigerated and enjoy them chilled. For the best taste and freshness, consume them within 2–3 days.',
  },
  {
    question: 'Which flavor is best for first-time customers?',
    answer:
      'Strawberry Banana, Mango Coconut, and Chocolate Peanut Butter are customer favorites and great choices for your first MISOHA experience.',
  },
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="faq" className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-balance text-4xl font-bold text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about ordering from MISOHA
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <span className="text-left font-semibold text-gray-900">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-amber-600"
                >
                  ▼
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="border-t border-gray-200 px-6 py-4 text-gray-700">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
