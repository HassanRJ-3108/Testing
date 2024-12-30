'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingBag, Search, Star } from 'lucide-react'

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Summer Collection",
      subtitle: "Discover the hottest trends",
      cta: "Shop Summer",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "New Arrivals",
      subtitle: "Be the first to get our latest products",
      cta: "See What's New",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Exclusive Deals",
      subtitle: "Limited time offers you can't miss",
      cta: "View Deals",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {slides[currentSlide].title}
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-white mb-8 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {slides[currentSlide].subtitle}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/products" passHref>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2 group">
              <span>{slides[currentSlide].cta}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            } transition-all duration-300`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-400 h-6 w-6 fill-current" />
            <span className="text-white font-semibold">4.8/5 (10,000+ reviews)</span>
          </div>
          <div className="flex space-x-4 sm:space-x-8">
            <div className="text-white text-center">
              <p className="font-semibold">Free Shipping</p>
              <p className="text-sm">On orders over ₹999</p>
            </div>
            <div className="text-white text-center">
              <p className="font-semibold">24/7 Support</p>
              <p className="text-sm">Always here to help</p>
            </div>
            <div className="text-white text-center">
              <p className="font-semibold">Easy Returns</p>
              <p className="text-sm">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

