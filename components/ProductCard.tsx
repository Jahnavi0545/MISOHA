'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'

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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={400}
              height={300}
              quality={75}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>

          {/* Price and Button */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-600">{product.price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
              onClick={(e) => {
                e.stopPropagation()
                sessionStorage.setItem('preselectedProduct', JSON.stringify({ productName: product.name }))
                document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Order Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
