'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Star, ShoppingCart, ArrowRight, Minus, Plus } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { getAllProducts } from '@/app/actions/actions'
import { Product } from '@/types/types'

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart, cart } = useCart()
  const [isZoomed, setIsZoomed] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      const allProducts = await getAllProducts()
      const foundProduct = Object.values(allProducts)
        .flatMap(category => category.products)
        .find(p => p.id === id)
      setProduct(foundProduct || null)
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      const cartItem = cart.find(item => item.id === product.id)
      if (cartItem) {
        setQuantity(cartItem.quantity)
      }
    }
  }, [product, cart])

  if (!product) {
    return <div className="text-center py-20">Product not found</div>
  }

  const handleAddToCart = () => {
    const productToAdd: Product = {
      ...product,
      quantity: quantity
    }
    addToCart(productToAdd)
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="container mx-auto px-4 py-16 mt-10">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left side - Product Image */}
        <div className="lg:w-1/2">
          <div 
            className="relative aspect-square overflow-hidden rounded-lg shadow-lg"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'}`}
            />
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mb-6">Rs {product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 text-gray-700">Quantity:</span>
            <button 
              onClick={decrementQuantity}
              className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 w-8 rounded-full flex items-center justify-center"
            >
              <Minus size={16} />
            </button>
            <span className="mx-4 text-xl font-semibold">{quantity}</span>
            <button 
              onClick={incrementQuantity}
              className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 w-8 rounded-full flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <Link
              href="/cart"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Go to Cart
            </Link>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Details</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Category: {product.category}</li>
              <li>In stock</li>
              <li>Free shipping</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

