'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <Image 
            src="/images/brand-icon.png" 
            alt="MISOHA" 
            width={70} 
            height={70}
            className="h-16 w-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#why" className="text-sm text-gray-700 hover:text-amber-600 transition-colors">
            About
          </Link>
          <Link href="#products" className="text-sm text-gray-700 hover:text-amber-600 transition-colors">
            Flavors
          </Link>
          <Link href="#faq" className="text-sm text-gray-700 hover:text-amber-600 transition-colors">
            FAQ
          </Link>
        </div>

        {/* CTA Button */}
        <button className="hidden rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white transition-transform hover:bg-amber-600 hover:scale-105 md:inline-block">
          Order Now
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            <Link href="#why" className="block py-2 text-sm text-gray-700">
              Why Us
            </Link>
            <Link href="#products" className="block py-2 text-sm text-gray-700">
              Products
            </Link>
            <Link href="#benefits" className="block py-2 text-sm text-gray-700">
              Benefits
            </Link>
            <Link href="#faq" className="block py-2 text-sm text-gray-700">
              FAQ
            </Link>
            <button className="w-full rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white hover:bg-amber-600 transition-colors">
              Order Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
