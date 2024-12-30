'use client'

import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are committed to providing the best online shopping experience. Our goal is to deliver quality products at the best prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-white">Products</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/categories" className="text-gray-400 hover:text-white">Categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">BaldiaTown Sector: 9C,</p>
            <p className="text-gray-400">Karachi, 75760, Pakistan</p>
            <p className="text-gray-400">Email: huzaifa3108hassan@gmail.com</p>
            <p className="text-gray-400">Phone: +92 3161097202</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 ShopKaro. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
