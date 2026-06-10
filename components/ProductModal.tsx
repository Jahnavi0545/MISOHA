'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  imageAlt: string
  color: string
  ingredients: string[]
  benefits: string[]
}

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="float-right text-3xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>

          {/* Content */}
          <div className="clear-both">
            {/* Product Image */}
            <div className="mb-6 h-80 overflow-hidden rounded-2xl">
              <Image
                src={product.image}
                alt={product.imageAlt}
                width={600}
                height={400}
                quality={85}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Title and Price */}
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-4 text-3xl font-bold text-amber-600">{product.price}</p>

            {/* Ingredients */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">Ingredients</h3>
              <ul className="mt-3 space-y-2">
                {product.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="mr-3 text-amber-600">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sessionStorage.setItem('preselectedProduct', JSON.stringify({ productName: product.name }))
                onClose()
                document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-8 w-full rounded-lg bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-amber-600"
            >
              Add to Order
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
