// src/components/ProductGrid.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/types';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.length > 0 ? (
        products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <ProductCard product={product} />
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">No products found in this category.</p>
      )}
    </div>
  );
}
