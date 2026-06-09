'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const columns = [
    {
      title: 'MISOHA',
      items: [
        { label: 'About Us', href: '#why' },
        { label: 'Instagram', href: '#' },
        { label: 'Facebook', href: '#' },
        { label: 'Twitter', href: '#' },
      ],
    },
    {
      title: 'Products',
      items: [
        { label: 'Overnight Oats', href: '#products' },
        { label: 'Wellness Shots', href: '#products' },
        { label: 'Benefits', href: '#benefits' },
        { label: 'Recipes', href: '#' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Contact Us', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Refund Policy', href: '#' },
      ],
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {columns.map((column, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h3 className="mb-4 text-lg font-bold">{column.title}</h3>
              <ul className="space-y-3">
                {column.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="text-sm text-gray-400">
            © {currentYear} MISOHA - Mind Souls Health. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-400">Accepted Payments:</p>
            <div className="flex gap-3">
              <span className="text-lg">💳</span>
              <span className="text-lg">🏦</span>
              <span className="text-lg">📱</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
