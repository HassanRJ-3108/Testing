'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../app/contexts/CartContext'
import { Product } from '@/types/types'

interface FeaturedProductsProps {
  products: {
    [key: string]: {
      id: string;
      name: string;
      products: Product[];
    };
  };
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addToCart } = useCart();

  // Flatten all products into a single array and take the first 8
  const featuredProducts = Object.values(products)
    .flatMap(category => category.products)
    .slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Featured Products
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Link href={`/product/${product.id}`} className="block relative">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-indigo-600">Rs {product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/products" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
