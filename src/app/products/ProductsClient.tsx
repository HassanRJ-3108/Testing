
'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Product } from '@/types/types';


function ProductsClient({ initialProducts }: { initialProducts: Record<string, { id: string; name: string; products: Product[] }> }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 500000]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [minRating, setMinRating] = React.useState<number>(0);

  const allProducts = Object.values(initialProducts).flatMap(category => category.products);
  
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1] &&
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    product.rating >= minRating
  );

  const categories = ['all', ...Object.keys(initialProducts)];

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Math.max(0, Math.min(parseInt(e.target.value) || 0, 500000));
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      if (index === 0 && value > newRange[1]) newRange[1] = value;
      if (index === 1 && value < newRange[0]) newRange[0] = value;
      return newRange;
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          All Products
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Left Side */}
        <div className="md:w-1/4 space-y-4">
          <div>
            <label className="block mb-2">Price Range:</label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="number"
                min="0"
                max="500000"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
                className="w-1/2 p-2 border rounded"
              />
              <span>-</span>
              <input
                type="number"
                min="0"
                max="500000"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div>PKR {priceRange[0]} - PKR {priceRange[1]}</div>
          </div>

          <div>
            <label className="block mb-2">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Minimum Rating:</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Products Grid - Right Side */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
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
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsClient;